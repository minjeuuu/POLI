#!/usr/bin/env python3
import smtplib
import ssl
import getpass
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Define target recipients (115 organizations)
RECIPIENTS = [
    # --- IVY LEAGUE & TOP US DEPARTMENTS ---
    {"org": "Harvard University (Department of Government)", "email": "government@wjh.harvard.edu"},
    {"org": "Harvard Kennedy School (Belfer Center)", "email": "belfer_center@hks.harvard.edu"},
    {"org": "Stanford University (Political Science)", "email": "politicalscience@stanford.edu"},
    {"org": "MIT (Department of Political Science)", "email": "polisci@mit.edu"},
    {"org": "Princeton University (Department of Politics)", "email": "politics@princeton.edu"},
    {"org": "Yale University (Department of Political Science)", "email": "political.science@yale.edu"},
    {"org": "Columbia University (Political Science)", "email": "polisci@columbia.edu"},
    {"org": "University of Chicago (Political Science)", "email": "political-science@uchicago.edu"},
    {"org": "University of Pennsylvania (Political Science)", "email": "polisci@sas.upenn.edu"},
    {"org": "Cornell University (Department of Government)", "email": "government@cornell.edu"},
    {"org": "Dartmouth College (Department of Government)", "email": "government.department@dartmouth.edu"},
    {"org": "Brown University (Political Science)", "email": "political_science@brown.edu"},
    {"org": "UC Berkeley (Political Science)", "email": "ps-staff@berkeley.edu"},
    {"org": "UCLA (Political Science)", "email": "polisci@polisci.ucla.edu"},
    {"org": "University of Michigan (Political Science)", "email": "polisci@umich.edu"},
    {"org": "Duke University (Political Science)", "email": "politicalscience@duke.edu"},
    {"org": "Johns Hopkins University (Political Science)", "email": "polisci@jhu.edu"},
    {"org": "Georgetown University (Department of Government)", "email": "government@georgetown.edu"},
    {"org": "Northwestern University (Political Science)", "email": "political-science@northwestern.edu"},
    {"org": "NYU (Department of Politics)", "email": "politics@nyu.edu"},
    {"org": "Vanderbilt University (Political Science)", "email": "political.science@vanderbilt.edu"},
    {"org": "University of Virginia (Politics)", "email": "politics@virginia.edu"},
    {"org": "Emory University (Political Science)", "email": "polisci@emory.edu"},
    {"org": "Washington University in St. Louis", "email": "polisci@wustl.edu"},
    {"org": "Carnegie Mellon University", "email": "sds@andrew.cmu.edu"},
    {"org": "Tufts University (Political Science)", "email": "politicalscience@tufts.edu"},
    {"org": "Boston University (Political Science)", "email": "polisci@bu.edu"},
    {"org": "George Washington University (PSC)", "email": "psc@gwu.edu"},
    {"org": "American University (School of Public Affairs)", "email": "spa@american.edu"},
    {"org": "Syracuse University (Maxwell School)", "email": "maxwell@syracuse.edu"},

    # --- TOP EUROPEAN & UK DEPARTMENTS ---
    {"org": "Oxford University (DPIR)", "email": "enquiries@politics.ox.ac.uk"},
    {"org": "Cambridge University (POLIS)", "email": "enquiries@polis.cam.ac.uk"},
    {"org": "London School of Economics (LSE)", "email": "gov.enquiries@lse.ac.uk"},
    {"org": "University College London (UCL)", "email": "political.science@ucl.ac.uk"},
    {"org": "King's College London (DPE)", "email": "dpe@kcl.ac.uk"},
    {"org": "University of Edinburgh (PIR)", "email": "pir.enquiries@ed.ac.uk"},
    {"org": "Sciences Po Paris", "email": "contact@sciencespo.fr"},
    {"org": "Hertie School (Berlin)", "email": "info@hertie-school.org"},
    {"org": "Graduate Institute Geneva (IHEID)", "email": "info@graduateinstitute.ch"},
    {"org": "ETH Zurich (Center for Comparative Studies)", "email": "cis@gess.ethz.ch"},
    {"org": "Leiden University (Political Science)", "email": "polsci@fsw.leidenuniv.nl"},
    {"org": "University of Amsterdam (Political Science)", "email": "polsci@uva.nl"},
    {"org": "Copenhagen University (Department of Political Science)", "email": "polsci@ifs.ku.dk"},
    {"org": "Stockholm University (Political Science)", "email": "info@statsvet.su.se"},
    {"org": "Trinity College Dublin", "email": "politics@tcd.ie"},
    {"org": "University of Oslo", "email": "admin@stv.uio.no"},
    {"org": "LMU Munich (Geschwister-Scholl-Institute)", "email": "gsi@gsi.uni-muenchen.de"},
    {"org": "Heidelberg University", "email": "info@ipw.uni-heidelberg.de"},
    {"org": "EUI Florence", "email": "sps.enquiries@eui.eu"},

    # --- TOP ASIA-PACIFIC & CANADIAN DEPARTMENTS ---
    {"org": "University of Toronto (Political Science)", "email": "polsci.info@utoronto.ca"},
    {"org": "McGill University (Political Science)", "email": "politicalscience.arts@mcgill.ca"},
    {"org": "UBC Vancouver (Political Science)", "email": "politics.dept@ubc.ca"},
    {"org": "University of Melbourne (SSPS)", "email": "ssps-enquiries@unimelb.edu.au"},
    {"org": "Australian National University (ANU)", "email": "bell.school@anu.edu.au"},
    {"org": "University of Sydney (SSPS)", "email": "ssps.enquiries@sydney.edu.au"},
    {"org": "National University of Singapore (NUS)", "email": "polbox1@nus.edu.sg"},
    {"org": "Nanyang Technological University (NTU)", "email": "hss-polisci@ntu.edu.sg"},
    {"org": "University of Tokyo (Graduate School of Law & Politics)", "email": "office@j.u-tokyo.ac.jp"},
    {"org": "Kyoto University", "email": "kyomu@law.kyoto-u.ac.jp"},
    {"org": "Seoul National University", "email": "politics@snu.ac.kr"},
    {"org": "Yonsei University", "email": "politics@yonsei.ac.kr"},
    {"org": "Tsinghua University (International Relations)", "email": "iis@tsinghua.edu.cn"},
    {"org": "Peking University (School of Government)", "email": "sg@pku.edu.cn"},
    {"org": "Fudan University (SIRPA)", "email": "sirpa@fudan.edu.cn"},
    {"org": "University of Hong Kong (PPA)", "email": "ppa@hku.hk"},

    # --- PUBLIC POLICY THINK TANKS ---
    {"org": "Brookings Institution", "email": "communications@brookings.edu"},
    {"org": "RAND Corporation", "email": "randinquiries@rand.org"},
    {"org": "Center for Strategic and International Studies (CSIS)", "email": "externalrelations@csis.org"},
    {"org": "Council on Foreign Relations (CFR)", "email": "communications@cfr.org"},
    {"org": "Carnegie Endowment for International Peace", "email": "info@ceip.org"},
    {"org": "Chatham House (RIIA)", "email": "contact@chathamhouse.org"},
    {"org": "American Enterprise Institute (AEI)", "email": "info@aei.org"},
    {"org": "Heritage Foundation", "email": "info@heritage.org"},
    {"org": "Cato Institute", "email": "info@cato.org"},
    {"org": "Center for American Progress (CAP)", "email": "progress@americanprogress.org"},
    {"org": "Hudson Institute", "email": "info@hudson.org"},
    {"org": "Peterson Institute (PIIE)", "email": "communications@piie.com"},
    {"org": "International Institute for Strategic Studies (IISS)", "email": "iiss@iiss.org"},
    {"org": "Stockholm International Peace Research Institute (SIPRI)", "email": "sipri@sipri.org"},
    {"org": "German Marshall Fund (GMF)", "email": "info@gmfus.org"},
    {"org": "Atlantic Council", "email": "info@atlanticcouncil.org"},
    {"org": "Woodrow Wilson Center", "email": "info@wilsoncenter.org"},
    {"org": "Center for New American Security (CNAS)", "email": "info@cnas.org"},
    {"org": "Urban Institute", "email": "externalaffairs@urban.org"},

    # --- CORPORATE AI, POLICY & DEFENSE LABS ---
    {"org": "Google Research", "email": "research-inquiries@google.com"},
    {"org": "Microsoft Research (Social Sciences Group)", "email": "msr-inquire@microsoft.com"},
    {"org": "Anthropic (Policy & Society Group)", "email": "inquiries@anthropic.com"},
    {"org": "OpenAI (Policy Research Division)", "email": "contact@openai.com"},
    {"org": "Palantir Technologies (Defense & Policy)", "email": "info@palantir.com"},
    {"org": "IBM Research (Social Computing)", "email": "ibmres@us.ibm.com"},
    {"org": "Meta AI (Policy & Research)", "email": "press@meta.com"},
    {"org": "Apple AI (Siri & Policy Research)", "email": "media.help@apple.com"},
    {"org": "Civic Technologies Lab", "email": "info@civictech.org"},
    {"org": "GovTech Singapore", "email": "info@tech.gov.sg"},
    {"org": "Palantir Government Division", "email": "government@palantir.com"},
    {"org": "Defense Advanced Research Projects Agency (DARPA)", "email": "publicrelations@darpa.mil"},
]

EMAIL_TEMPLATE_SUBJECT = "Formal Proposal: Intellectual Property Acquisition & Site Licensing - POLI Geopolitical Simulation & Research Suite"

EMAIL_TEMPLATE_BODY = """Dear members of the {org} team,

My name is Matthew Cesar Corpuz. I hold a Bachelor of Arts in Political Science from Baguio City. I am writing to you today to present a formal acquisition and licensing proposal for POLI (https://github.com/minjeuuu/POLI), a modern, high-density geopolitical simulation, cabinet-building, and academic research workspace.

POLI represents the synthesis of political theory, comparative government frameworks, and specialized client-side software engineering. It was built to solve the high operating costs and latency of traditional web-based research portals by running entirely client-side.

As the independent developer of POLI, I deeply want to see this application continue to be maintained and expand its capabilities. However, I currently lack the institutional funding and infrastructure required to maintain and host it at scale. Consequently, I have made the decision to offer the software for complete acquisition. The acquiring party will receive 100% intellectual property ownership, the codebase, relational database schemas, and all legal rights to the application.

Core Value Propositions & IP Included in the Sale:

1. Offline-First Zero-Operating-Cost Architecture: Built over PADE (Proprietary Academic Database Engine), which runs an emulated SQL query engine directly over IndexedDB on the client browser. Features a redundant in-memory fallback state machine ensuring zero-crash boots and zero backend database scaling overhead.
2. Academic Reader & Citation Compiler: A typography-optimized reading interface with custom print stylesheets for document generation. Features a bibliographic citation engine supporting over 50 regional academic formats (including APSA, Chicago, Bluebook, IEEE, BibTeX, and Harvard).
3. The POLIverse Simulation Engine: An interactive cabinet-building framework that uses structural political equations to calculate Cabinet Cohesion, Structural Integrity, and Ideological Alignment, moving beyond simplistic heuristics.
4. Comprehensive Geopolitical Taxonomies: Pre-loaded relational database modules mapping 15+ distinct categories including state agencies, national elections, legal case briefs, treaties, political parties, social movements, and regional demographic variables.
5. Custom Scholarly Design System: A clean, warm off-white (book-like) user interface optimized for high information density, long research sessions, and detailed comparative matrices.

To demonstrate the depth of the application, we have compiled a visual catalog documenting the tabs and detail screens (including the Cabinet Builder, Geopolitical Indicator Matrix, Citation reader, and International Org profile). These materials, along with the full codebase, can be reviewed directly on our GitHub repository:
https://github.com/minjeuuu/POLI

Acquisition Valuation:
We value the outright acquisition of POLI and all associated intellectual property at $850,000 USD. Alternatively, we are open to institution-wide site licensing arrangements starting at $85,000 USD per annum. The acquisition includes 60 days of direct technical transition support and comprehensive system handover documentation.

If this aligns with your department's academic research, policy simulation, or technological goals, I would welcome the opportunity to schedule a brief technical walkthrough.

Sincerely,

Matthew Cesar Corpuz
Bachelor of Arts in Political Science (Baguio City)
Owner & Developer of POLI
https://github.com/minjeuuu/POLI
corpuzmatthew0814@gmail.com
"""

def main():
    print("=== POLI Acquisition Proposal Email Auto-Sender ===")
    print(f"Loaded {len(RECIPIENTS)} prestigious recipient organizations.")
    print("----------------------------------------------------------------")
    
    # Auto-filled defaults for Matthew's Google/Gmail account
    default_smtp = "smtp.gmail.com"
    default_port = 465
    default_email = "corpuzmatthew0814@gmail.com"
    
    print(f"Default Sender Profile:")
    print(f"  SMTP Server: {default_smtp}")
    print(f"  SMTP Port:   {default_port} (SSL)")
    print(f"  Gmail User:  {default_email}")
    print("----------------------------------------------------------------")
    
    use_defaults = input("Use default Gmail SMTP settings? (y/n, default=y): ").strip().lower()
    if use_defaults == 'n':
        smtp_server = input("SMTP Server (e.g. smtp.gmail.com): ").strip()
        try:
            smtp_port = int(input("SMTP Port (e.g. 465 for SSL, 587 for TLS): ").strip())
        except ValueError:
            print("Invalid port number.")
            return
        sender_email = input("Sender Email: ").strip()
    else:
        smtp_server = default_smtp
        smtp_port = default_port
        sender_email = default_email

    sender_name = "Matthew Cesar Corpuz"
    print(f"\nPlease enter the Google App Password for {sender_email}.")
    print("Note: To send emails using a Google account, you must use a 'Google App Password'")
    print("generated from your Google Account Security Settings under 2-Step Verification.")
    password = getpass.getpass("Password / App Password: ")
    
    if not password:
        print("Password cannot be empty.")
        return
        
    print("\nEstablishing secure connection to SMTP server...")
    context = ssl.create_default_context()
    
    try:
        if smtp_port == 465:
            server = smtplib.SMTP_SSL(smtp_server, smtp_port, context=context)
        else:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls(context=context)
            
        server.login(sender_email, password)
        print("✓ Connected and authenticated successfully.\n")
    except Exception as e:
        print(f"\nFailed to connect/authenticate: {e}")
        print("Please check your email address, port, server, and verify your App Password is correct.")
        return
        
    print("Starting dispatch sequence...")
    sent_count = 0
    for idx, recipient in enumerate(RECIPIENTS, 1):
        try:
            msg = MIMEMultipart()
            msg["From"] = f"{sender_name} <{sender_email}>"
            msg["To"] = recipient["email"]
            msg["Subject"] = EMAIL_TEMPLATE_SUBJECT
            
            body = EMAIL_TEMPLATE_BODY.format(org=recipient["org"])
            msg.attach(MIMEText(body, "plain"))
            
            server.sendmail(sender_email, recipient["email"], msg.as_string())
            print(f"[{idx}/{len(RECIPIENTS)}] ✓ Sent to {recipient['org']} ({recipient['email']})")
            sent_count += 1
        except Exception as err:
            print(f"[{idx}/{len(RECIPIENTS)}] ✗ Failed sending to {recipient['org']}: {err}")
            
    server.quit()
    print("----------------------------------------------------------------")
    print(f"Dispatch completed. Sent {sent_count}/{len(RECIPIENTS)} emails successfully.")
    print("----------------------------------------------------------------")

if __name__ == "__main__":
    main()
