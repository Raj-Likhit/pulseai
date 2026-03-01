import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

const assetsDir = path.join(publicDir, 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);

// Dark theme colors
const bgColor = '#0B0906';
const textColor = '#FAF3E0';
const accentColor = '#F4A623';
const mutedColor = '#8A857D';

const doc = new PDFDocument({ margin: 50, size: 'A4' });
doc.pipe(fs.createWriteStream(path.join(assetsDir, 'Pulse_SCC_Template.pdf')));

// Draw dark background
doc.rect(0, 0, doc.page.width, doc.page.height).fill(bgColor);

// Body text configuration
doc.fillColor(textColor);

doc.fontSize(24).fillColor(accentColor).text('Standard Contractual Clauses (SCCs)', { align: 'center' });
doc.moveDown();
doc.fontSize(12).fillColor(textColor).text('Module 2: Transfer controller to processor');
doc.moveDown();
doc.fillColor(mutedColor).text('This is a generated template example for the Pulse AI Data Processing Agreement. In a production environment, this would be a full legal document containing the EU SCCs.', { align: 'justify' });
doc.moveDown(2);
doc.fontSize(14).fillColor(textColor).text('SECTION I', { underline: true });
doc.moveDown();
doc.fontSize(12).text('Clause 1: Purpose and scope');
doc.fillColor(mutedColor).text('(a) The purpose of these standard contractual clauses is to ensure compliance with the requirements of Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data.');
doc.moveDown();
doc.fillColor(textColor).text('Clause 2: Effect and invariability of the Clauses');
doc.fillColor(mutedColor).text('(a) These Clauses set out appropriate safeguards, including enforceable data subject rights and effective legal remedies, pursuant to Article 46(1) and Article 46(2)(c) of Regulation (EU) 2016/679.');
doc.moveDown(5);
doc.fillColor(accentColor).text('Pulse AI, Inc. Legal Department', { align: 'right' });
doc.fillColor(mutedColor).text('Date: February 2026', { align: 'right' });

doc.end();
console.log("Dark Theme PDF Generated successfully at public/assets/Pulse_SCC_Template.pdf");
