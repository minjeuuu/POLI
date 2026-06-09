#!/usr/bin/env bash
set -e

echo "=== POLI Android APK Build Pipeline ==="

# 1. Setup paths and directories
PROJECT_DIR="$(pwd)"
BUILD_DIR="${PROJECT_DIR}/build_apk"
JAR_URL="https://github.com/Sable/android-platforms/raw/master/android-28/android.jar"
JAR_FILE="${PROJECT_DIR}/android-28.jar"

echo "Cleaning old build artifacts..."
rm -rf "${BUILD_DIR}"
mkdir -p "${BUILD_DIR}/src/com/poli/app"
mkdir -p "${BUILD_DIR}/res/layout"
mkdir -p "${BUILD_DIR}/res/values"
mkdir -p "${BUILD_DIR}/res/drawable"
mkdir -p "${BUILD_DIR}/assets"
mkdir -p "${BUILD_DIR}/obj"

# 2. Download android.jar if not already cached
if [ ! -f "${JAR_FILE}" ]; then
    echo "Downloading full android.jar framework library from GitHub (44.6 MB)..."
    curl -L -o "${JAR_FILE}" "${JAR_URL}"
else
    echo "Using cached android.jar."
fi

# 3. Compile Vite production assets
echo "Bundling Vite frontend..."
npm run build

echo "Copying Vite assets into Android assets..."
mkdir -p "${BUILD_DIR}/assets/dist"
cp -r "${PROJECT_DIR}/dist"/* "${BUILD_DIR}/assets/dist/"

# 3.5 Generate launcher icon vector drawable
echo "Generating launcher icon vector drawable..."
cat << 'EOF' > "${BUILD_DIR}/res/drawable/ic_launcher.xml"
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="100dp"
    android:height="100dp"
    android:viewportWidth="100"
    android:viewportHeight="100">
    <path
        android:fillColor="#FFFFFF"
        android:pathData="M0,0 h100 v100 h-100 z" />
    <path
        android:strokeColor="#000000"
        android:strokeWidth="4"
        android:pathData="M20,80 L80,80" />
    <path
        android:fillColor="#000000"
        android:pathData="M28,30 h8 v50 h-8 z" />
    <path
        android:fillColor="#000000"
        android:pathData="M46,30 h8 v50 h-8 z" />
    <path
        android:fillColor="#000000"
        android:pathData="M64,30 h8 v50 h-8 z" />
    <path
        android:strokeColor="#000000"
        android:strokeWidth="3"
        android:pathData="M20,20 h60 v10 h-60 z" />
    <path
        android:fillColor="#000000"
        android:fillAlpha="0.5"
        android:pathData="M25,15 h50 v5 h-50 z" />
</vector>
EOF

# 4. Generate Android Manifest
echo "Generating AndroidManifest.xml..."
cat << 'EOF' > "${BUILD_DIR}/AndroidManifest.xml"
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.poli.app"
    android:versionCode="1"
    android:versionName="1.0">
    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="34" />
    <uses-permission android:name="android.permission.INTERNET" />
    <application 
        android:label="POLI" 
        android:icon="@drawable/ic_launcher"
        android:roundIcon="@drawable/ic_launcher"
        android:theme="@android:style/Theme.NoTitleBar"
        android:hardwareAccelerated="true"
        android:usesCleartextTraffic="true">
        <activity android:name=".MainActivity" android:exported="true" android:configChanges="orientation|screenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
EOF

# 5. Generate Android Java WebView class
echo "Generating WebView Activity Java code..."
cat << 'EOF' > "${BUILD_DIR}/src/com/poli/app/MainActivity.java"
package com.poli.app;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        WebView webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        
        // Enable essential browser capabilities
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        
        // Critical for ES modules / relative loading under file:///
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        
        // Prevent launching external browsers
        webView.setWebViewClient(new WebViewClient());
        
        // Load the local PWA index inside Android assets
        webView.loadUrl("file:///android_asset/dist/index.html");
        
        setContentView(webView);
    }
}
EOF

# 6. Generate resource string values
cat << 'EOF' > "${BUILD_DIR}/res/values/strings.xml"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">POLI</string>
</resources>
EOF

# 7. Package resources using aapt2
echo "Compiling resources with aapt2..."
aapt2 compile --dir "${BUILD_DIR}/res" -o "${BUILD_DIR}/compiled_res.zip"

# 8. Link resources and assets, generate R.java and skeleton APK
echo "Linking resources and assets with aapt2..."
aapt2 link -o "${BUILD_DIR}/unaligned.apk" \
    -I "${JAR_FILE}" \
    --manifest "${BUILD_DIR}/AndroidManifest.xml" \
    "${BUILD_DIR}/compiled_res.zip" \
    -A "${BUILD_DIR}/assets" \
    --java "${BUILD_DIR}/src"

# 9. Compile Java source files to classes
echo "Compiling Java sources to bytecode (targeting Java 8)..."
javac --release 8 -d "${BUILD_DIR}/obj" \
    -cp "${JAR_FILE}" \
    -sourcepath "${BUILD_DIR}/src" \
    "${BUILD_DIR}/src/com/poli/app/MainActivity.java" \
    "${BUILD_DIR}/src/com/poli/app/R.java"

# 10. Translate bytecode to DEX (classes.dex)
echo "Converting Java bytecode to DEX format..."
d8 --output "${BUILD_DIR}" \
   --lib "${JAR_FILE}" \
   "${BUILD_DIR}/obj/com/poli/app"/*.class

# 11. Add DEX file to APK
echo "Injecting classes.dex..."
cd "${BUILD_DIR}"
aapt add unaligned.apk classes.dex

# 12. Create a self-signed Keystore
echo "Generating local release keystore..."
if [ ! -f "${PROJECT_DIR}/release.keystore" ]; then
    keytool -genkeypair -v \
        -keystore "${PROJECT_DIR}/release.keystore" \
        -alias poli_key \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -storepass android \
        -keypass android \
        -dname "CN=POLI, OU=Academic, O=PoliStudio, C=US"
fi

# 13. Sign APK with apksigner
echo "Signing release APK..."
apksigner sign \
    --ks "${PROJECT_DIR}/release.keystore" \
    --ks-key-alias poli_key \
    --ks-pass pass:android \
    --key-pass pass:android \
    --out "${PROJECT_DIR}/poli.apk" \
    unaligned.apk

echo "=== SUCCESS ==="
echo "Signed Android APK created successfully at: ${PROJECT_DIR}/poli.apk"
