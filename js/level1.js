/*
 * CMMC Level 1 question set.
 *
 * Requirement text comes from the CMMC Level 1 Assessment Guide
 * (FAR 52.204-21(b)(1)). Each practice has one plain-language yes/no question.
 * Edit questions here; the page builds itself from this list.
 */
window.CMMC_L1 = {
  version: "2026-11",
  families: [
    { code: "AC", name: "Access Control" },
    { code: "IA", name: "Identification and Authentication" },
    { code: "MP", name: "Media Protection" },
    { code: "PE", name: "Physical Protection" },
    { code: "SC", name: "System and Communications Protection" },
    { code: "SI", name: "System and Information Integrity" }
  ],
  practices: [
    {
      id: "AC.L1-b.1.i",
      family: "AC",
      requirement: "Limit information system access to authorized users, processes acting on behalf of authorized users, or devices (including other information systems).",
      question: "Can only approved people and approved company devices get into the computers and accounts that hold contract information?"
    },
    {
      id: "AC.L1-b.1.ii",
      family: "AC",
      requirement: "Limit information system access to the types of transactions and functions that authorized users are permitted to execute.",
      question: "Can each person only do what their job requires? For example, can only designated people install software, change settings, or open restricted folders?"
    },
    {
      id: "AC.L1-b.1.iii",
      family: "AC",
      requirement: "Verify and control/limit connections to and use of external information systems.",
      question: "Do you control whether personal or outside devices and accounts (personal laptops, phones, personal email, personal cloud storage) can be used with company information?"
    },
    {
      id: "AC.L1-b.1.iv",
      family: "AC",
      requirement: "Control information posted or processed on publicly accessible information systems.",
      question: "Does someone review what goes on your website, social media, or other public sites so non-public contract information never gets posted?"
    },
    {
      id: "IA.L1-b.1.v",
      family: "IA",
      requirement: "Identify information system users, processes acting on behalf of users, or devices.",
      question: "Does every person have their own account (no shared logins), and do you know every device connected to your network?"
    },
    {
      id: "IA.L1-b.1.vi",
      family: "IA",
      requirement: "Authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite to allowing access to organizational information systems.",
      question: "Does every person and device have to prove who they are, with a password or similar, before getting into company systems?"
    },
    {
      id: "MP.L1-b.1.vii",
      family: "MP",
      requirement: "Sanitize or destroy information system media containing Federal Contract Information before disposal or release for reuse.",
      question: "Before a computer, drive, phone, or paper record leaves the company or gets reused, do you wipe or destroy any contract information on it?"
    },
    {
      id: "PE.L1-b.1.viii",
      family: "PE",
      requirement: "Limit physical access to organizational information systems, equipment, and the respective operating environments to authorized individuals.",
      question: "Are the offices, computers, and equipment that hold contract information locked or restricted so only authorized staff can get to them?"
    },
    {
      id: "PE.L1-b.1.ix",
      family: "PE",
      requirement: "Escort visitors and monitor visitor activity; maintain audit logs of physical access; and control and manage physical access devices.",
      question: "Are visitors escorted and supervised, do you keep a record of who enters, and do you keep track of keys, badges, and door codes?"
    },
    {
      id: "SC.L1-b.1.x",
      family: "SC",
      requirement: "Monitor, control, and protect organizational communications (i.e., information transmitted or received by organizational information systems) at the external boundaries and key internal boundaries of the information systems.",
      question: "Is your network protected by a firewall that controls what comes in and goes out?"
    },
    {
      id: "SC.L1-b.1.xi",
      family: "SC",
      requirement: "Implement subnetworks for publicly accessible system components that are physically or logically separated from internal networks.",
      question: "Is anything the public can reach from the internet (like a website or file server you host) kept on a separate network from your internal computers?"
    },
    {
      id: "SI.L1-b.1.xii",
      family: "SI",
      requirement: "Identify, report, and correct information and information system flaws in a timely manner.",
      question: "Are security updates for computers, software, and equipment installed promptly, with someone responsible for checking?"
    },
    {
      id: "SI.L1-b.1.xiii",
      family: "SI",
      requirement: "Provide protection from malicious code at appropriate locations within organizational information systems.",
      question: "Does every computer run antivirus or anti-malware protection?"
    },
    {
      id: "SI.L1-b.1.xiv",
      family: "SI",
      requirement: "Update malicious code protection mechanisms when new releases are available.",
      question: "Does your antivirus update itself automatically when new versions or definitions come out?"
    },
    {
      id: "SI.L1-b.1.xv",
      family: "SI",
      requirement: "Perform periodic scans of the information system and real-time scans of files from external sources as files are downloaded, opened, or executed.",
      question: "Does your antivirus scan computers on a regular schedule, and check files as they're downloaded or opened?"
    }
  ]
};
