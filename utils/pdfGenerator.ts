import jsPDF from 'jspdf';

export interface PDFSection {
    title: string;
    content: string | string[];
}

export const generateAestheticPDF = (
    title: string,
    subtitle: string,
    description: string,
    sections: PDFSection[],
    filename: string = "document.pdf"
) => {
    const doc = new jsPDF();
    let y = 0;
    const PAGE_HEIGHT = 297;
    const MARGIN_X = 25;
    const MAX_WIDTH = 160;
    const BOTTOM_MARGIN = 20;

    const addPageAesthetics = () => {
        // Minimalist aesthetic, just clean off-white background
        doc.setFillColor(253, 252, 250);
        doc.rect(0, 0, 210, 297, 'F');
        
        // Very subtle top accent line
        doc.setFillColor(200, 200, 200);
        doc.rect(25, 12, 160, 0.5, 'F');
        
        // Footer Text
        doc.setFont("times", "normal");
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        const pageNum = doc.getNumberOfPages();
        doc.text(`Page ${pageNum} • POLI Academic Archive`, 105, 285, { align: "center" });

        y = 30; // reset y
    };

    const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > PAGE_HEIGHT - BOTTOM_MARGIN) {
            doc.addPage();
            addPageAesthetics();
            return true;
        }
        return false;
    };

    // First Page
    addPageAesthetics();
    y += 10;

    // Main Title
    doc.setFont("times", "bold");
    doc.setFontSize(26);
    doc.setTextColor(30, 30, 30);
    const safeTitle = doc.splitTextToSize(title, MAX_WIDTH);
    doc.text(safeTitle, MARGIN_X, y);
    y += (safeTitle.length * 9) + 2;

    // Subtitle
    if (subtitle) {
        doc.setFont("times", "italic");
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        const safeSubtitle = doc.splitTextToSize(subtitle, MAX_WIDTH);
        doc.text(safeSubtitle, MARGIN_X, y);
        y += (safeSubtitle.length * 6) + 10;
    }

    // Elegant Divider
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(MARGIN_X, y, MARGIN_X + MAX_WIDTH, y);
    y += 15;

    // Helper function for long text paragraph rendering across pages
    const renderLongText = (text: string, fontSize: number, fontStyle: "normal"|"bold"|"italic", xOffset: number, maxWidth: number, firstLineOffset: number = 0) => {
        doc.setFont("times", fontStyle);
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        const lineHeight = fontSize * 0.45; // Approx linespacing

        for (let i = 0; i < lines.length; i++) {
            checkPageBreak(lineHeight);
            doc.text(lines[i], MARGIN_X + xOffset + (i === 0 ? firstLineOffset : 0), y, { align: "left" });
            y += lineHeight;
        }
    };

    // Description text
    if (description) {
        doc.setTextColor(40, 40, 40);
        renderLongText(description, 12, "normal", 0, MAX_WIDTH);
        y += 12;
    }

    // Sections
    sections.forEach(section => {
        // Section Header
        checkPageBreak(25);
        y += 8;
        
        doc.setFont("times", "bold");
        doc.setFontSize(14);
        doc.setTextColor(20, 20, 20);
        doc.text(section.title.toUpperCase(), MARGIN_X, y);
        
        doc.setLineWidth(0.3);
        doc.setDrawColor(220, 220, 220);
        doc.line(MARGIN_X, y + 2, MARGIN_X + MAX_WIDTH, y + 2);
        
        y += 10;

        doc.setTextColor(40, 40, 40);
        
        if (Array.isArray(section.content)) {
            section.content.forEach(item => {
                checkPageBreak(6);
                doc.setFont("times", "bold");
                doc.setFontSize(11);
                doc.text("•", MARGIN_X, y);
                
                let startY = y;
                renderLongText(item, 11, "normal", 5, MAX_WIDTH - 5);
                // renderLongText increments y, startY is where the bullet is
            });
            y += 8;
        } else {
            renderLongText(section.content, 11, "normal", 0, MAX_WIDTH);
            y += 12;
        }
    });

    // End marker
    checkPageBreak(30);
    y += 15;
    
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("--- End of Document ---", 105, y, { align: "center" });

    doc.save(filename);
};
