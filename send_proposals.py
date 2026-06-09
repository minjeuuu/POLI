#!/usr/bin/env python3
import smtplib
import ssl
import getpass
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Define target recipients
RECIPIENTS = [
    # --- ACADEMIC INSTITUTIONS ---
    {"org": "Harvard University (Department of Government)", "email": "government@wjh.harvard.edu"},
    {"org": "Harvard Kennedy School (Belfer Center)", "email": "belfer_center@hks.harvard.edu"},
    {"org": "Stanford University (Political Science)", "email": "politicalscience@stanford.edu"},
    {"org": "MIT (Department of Political Science)", "email": "polisci@mit.edu"},
    {"org": "Princeton University (Department of Politics)", "email": "politics@princeton.edu"},
    {"org": "Yale University (Department of Political Science)", "email": "political.science@yale.edu"},
    {"org": "Columbia University (Political Science)", "email": "polisci@columbia.edu"},
    {"org": "Oxford University (DPIR)", "email": "enquiries@politics.ox.ac.uk"},
    {"org": "Cambridge University (POLIS)", "email": "enquiries@polis.cam.ac.uk"},
    {"org": "LSE (Department of Government)", "email": "gov.enquiries@lse.ac.uk"},
    
    # --- THINK TANKS & POLICY RESEARCH ---
    {"org": "Brookings Institution", "email": "communications@brookings.edu"},
    {"org": "RAND Corporation", "email": "randinquiries@rand.org"},
    {"org": "Center for Strategic and International Studies (CSIS)", "email": "externalrelations@csis.org"},
    {"org": "Council on Foreign Relations (CFR)", "email": "communications@cfr.org"},
    {"org": "Carnegie Endowment for International Peace", "email": "info@ceip.org"},
    {"org": "Chatham House", "email": "contact@chathamhouse.org"},
    {"org": "American Enterprise Institute (AEI)", "email": "info@aei.org"},
    
    # --- CORPORATE AI & POLICY RESEARCH ---
    {"org": "Google Research", "email": "research-inquiries@google.com"},
    {"org": "Microsoft Research (Social Sciences Group)", "email": "msr-inquire@microsoft.com"},
    {"org": "Anthropic (Policy & Society)", "email": "inquiries@anthropic.com"},
    {"org": "OpenAI (Policy & Research)", "email": "contact@openai.com"},
]

EMAIL_TEMPLATE_SUBJECT = "Acquisition Inquiry: POLI - High-Density Geopolitical Simulation & Academic Curation Workspace"

EMAIL_TEMPLATE_BODY = """Dear members of the {org} team,

I am writing to formally present an acquisition opportunity for POLI, an advanced geopolitical simulation, cabinet-building, and academic research workspace designed specifically for institutions at the intersection of political science, policy analysis, and advanced simulation modeling.

POLI bridges the gap between historical taxonomies and modern interactive interfaces, combining client-first architecture with high-density data representation. 

Key Technical & Functional Features:
1. POLIverse Simulation Engine: A cabinet-building framework that evaluates Structural Integrity, Ideological Alignment, and Economic Viability based on custom structural formulas.
2. Relational Database Layer (PADE): A custom SQL emulation built on top of IndexedDB with an automated in-memory fallback state machine to ensure zero-crash initialization.
3. Decoupled Architecture: A clean React 19 + Vite client-side single-page application integrated with an Express API gateway acting as a secure RSS aggregator and proxy.
4. Professional Document Reader: Implements dynamic text-justified layouts, media queries for clean printing, and an inline citation compiler supporting over 50 formats (APSA, Chicago, Bluebook, IEEE, BibTeX).

Visual materials, including high-fidelity screenshots of the working Home Dashboard, the Cabinet Builder, and the Citation modal overlay, are hosted on GitHub:
https://github.com/minjeuuu/POLI

We are currently valuing the outright acquisition of POLI (including proprietary source code, emulated relational engine IP, and simulator configurations) at $850,000 USD, or a site-licensing arrangement starting at $85,000 USD per annum.

If this aligns with your department's technological research or simulation goals, please let us know when you would be available for a brief technical walkthrough.

Sincerely,

Aris Thorne
Lead Developer & Broker, POLI Project
https://github.com/minjeuuu/POLI
"""

def main():
    print("=== POLI Acquisition Proposal Email Auto-Sender ===")
    print("This script will send a professional proposal to 25 target organizations.")
    print("----------------------------------------------------------------")
    
    # Get SMTP credentials
    smtp_server = input("SMTP Server (e.g. smtp.gmail.com): ").strip()
    try:
        smtp_port = int(input("SMTP Port (e.g. 465 for SSL, 587 for TLS): ").strip())
    except ValueError:
        print("Invalid port number.")
        return

    sender_email = input("Sender Email: ").strip()
    sender_name = input("Sender Display Name (e.g. Aris Thorne): ").strip()
    password = getpass.getpass("Password / App Password: ")
    
    print("\nStarting email dispatch...")
    
    # Setup connection
    context = ssl.create_default_context()
    
    try:
        if smtp_port == 465:
            server = smtplib.SMTP_SSL(smtp_server, smtp_port, context=context)
        else:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls(context=context)
            
        server.login(sender_email, password)
    except Exception as e:
        print(f"\nFailed to connect/authenticate: {e}")
        return
        
    sent_count = 0
    for recipient in RECIPIENTS:
        try:
            msg = MIMEMultipart()
            msg["From"] = f"{sender_name} <{sender_email}>"
            msg["To"] = recipient["email"]
            msg["Subject"] = EMAIL_TEMPLATE_SUBJECT
            
            body = EMAIL_TEMPLATE_BODY.format(org=recipient["org"])
            msg.attach(MIMEText(body, "plain"))
            
            server.sendmail(sender_email, recipient["email"], msg.as_string())
            print(f"✓ Sent to {recipient['org']} ({recipient['email']})")
            sent_count += 1
        except Exception as err:
            print(f"✗ Failed sending to {recipient['org']}: {err}")
            
    server.quit()
    print(f"\nDispatch completed. Sent {sent_count}/{len(RECIPIENTS)} successfully.")

if __name__ == "__main__":
    main()
