import { FileText, ShieldAlert, Lock, Scale, Accessibility, Cookie, ArrowLeft, Printer, Mail, CheckCircle2 } from 'lucide-react';

export const LEGAL_DOCS = {
  privacy: {
    id: 'privacy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    category: 'Privacy & Data Protection',
    icon: FileText,
    lastUpdated: 'October 13, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Explains how VitalGuard LLC collects, protects, processes, and restricts use of Protected Health Information (PHI) and personal data across VocoRx Voice AI deployments.',
    sections: [
      {
        id: 'overview',
        heading: '1. Overview & Entity Information',
        content: `This Privacy Policy outlines the practices and policies of VitalGuard LLC ("VitalGuard," "VocoRx," "we," "us," or "our") regarding the collection, use, transmission, and safeguarding of information obtained through our autonomous Voice AI platform, website, APIs, and associated pharmacy management system (PMS) integrations.

VocoRx operates primarily as a technology service provider and Business Associate to licensed retail, compounding, hospital, and specialty pharmacies (collectively, "Covered Entities" under HIPAA). We treat all patient records, prescription data, voice audio recordings, and call transcripts with the highest standards of clinical privacy, data minimization, and regulatory compliance.`,
      },
      {
        id: 'phi-distinction',
        heading: '2. Protected Health Information (PHI) vs. General Data',
        content: `We clearly delineate between two distinct classifications of data:

• Protected Health Information (PHI): Identifiable patient health data—including patient names, phone numbers, dates of birth, prescription numbers, medication names, dosages, refill histories, and audio streams of patient calls. When handling PHI on behalf of pharmacies, VitalGuard LLC acts strictly as a Business Associate subject to the Health Insurance Portability and Accountability Act (HIPAA), the HITECH Act, state healthcare privacy statutes, and executed Business Associate Agreements (BAAs).

• General Commercial Data: Contact information of pharmacy administrators, practice analytics, website visitor telemetry, and billing details for pharmacy accounts.`,
      },
      {
        id: 'collection',
        heading: '3. Information We Collect and Process',
        content: `In delivering autonomous telephony and MedSync outreach services, VocoRx processes:

• Bidirectional PMS Data: Prescriptions due for refill, synchronized fill anchor dates, pickup preferences, and medication synchronization statuses synchronized via secure HL7 v2, FHIR R4, NCPDP SCRIPT, or SFTP batch interfaces.
• Telephony Audio & Transcripts: Transient real-time audio streams generated during inbound patient calls or automated outbound MedSync/refill notifications, alongside cryptographically encrypted call transcripts.
• Identity Verification Metadata: Patient-provided confirmation attributes (such as date of birth or billing zip code) collected strictly to authenticate identity prior to disclosing any prescription specifics.
• Telemetry & System Logs: Call timestamps, delivery latencies, connection durations, network routing data, and telephony carrier disposition codes for audit compliance.`,
      },
      {
        id: 'ai-training',
        heading: '4. AI Model Training & Zero-Data-Retention Safeguards',
        content: `VitalGuard LLC maintains a strict, contractual guarantee regarding artificial intelligence inference:

• Zero Foundation Training: Neither patient voice audio, nor raw call transcripts, nor PMS health records are ever used to train, retrain, or fine-tune public foundation AI models (such as commercial LLMs or general-purpose speech models).
• Isolated Inference Pipelines: Voice transcription, intent extraction, and conversational synthesis occur within isolated, HIPAA-compliant Virtual Private Clouds (VPC) under zero-retention enterprise agreements.
• De-Identification: Any internal telemetry used for system reliability, speech recognition acoustic tuning, or latency benchmarking is stripped of all eighteen (18) HIPAA identifiers in accordance with the HIPAA Safe Harbor De-Identification standard (45 C.F.R. § 164.514(b)).`,
      },
      {
        id: 'use-of-info',
        heading: '5. How We Use Information',
        content: `Information processed by VocoRx is used strictly for authorized healthcare operational purposes:

• Executing autonomous outbound phone calls and SMS notifications for MedSync enrollment, refill approvals, ready-for-pickup notices, and will-call adherence checks.
• Powering conversational inbound IVR flows that answer patient inquiries regarding pharmacy store hours, prescription status, or pharmacist transfers.
• Writing verified refill requests, pickup date selections, and patient notes directly back into the pharmacy's PMS without manual data entry.
• Triaging and immediately warm-transferring clinical questions, potential drug-drug interactions, or adverse side-effect reports to on-duty licensed pharmacists.`,
      },
      {
        id: 'sharing',
        heading: '6. Information Sharing & Third Parties',
        content: `VitalGuard LLC does not sell, rent, monetize, or trade patient data, PHI, or pharmacy customer lists under any circumstances. Data is disclosed only to:

• The authorizing Covered Entity pharmacy that maintains the patient relationship.
• Verified Business Associate Subcontractors (e.g., enterprise cloud infrastructure hosts, SOC 2 Type II compliant SIP telephony carriers) who are contractually bound by signed BAAs and strict confidentiality obligations.
• Legal and regulatory bodies where strictly required by applicable federal, state, or judicial subpoenas or compliance mandates.`,
      },
      {
        id: 'retention-disposal',
        heading: '7. Data Retention & Secure Cryptographic Disposal',
        content: `All PHI is retained only for the duration specified in the governing pharmacy agreement or as required by applicable state board of pharmacy record-keeping requirements.

Upon contract termination or upon receipt of a written directive from the Covered Entity, all electronic PHI, voice audio files, and encrypted transcript records are permanently purged from active and backup databases using cryptographic erasure methods aligned with NIST Special Publication 800-88 Revision 1 (Guidelines for Media Sanitization).`,
      },
      {
        id: 'patient-rights',
        heading: '8. Patient Rights & Privacy Inquiries',
        content: `Patients wishing to review, correct, amend, or request an accounting of disclosures of their Protected Health Information should directly contact their dispensing pharmacy. As a Business Associate, VitalGuard LLC collaborates with pharmacies to fulfill all verified patient requests within statutory timeframes.

For general privacy inquiries or to reach our Data Protection Officer, email us at:
VitalGuard LLC — VocoRx Data Protection Office
Email: privacy@vocorx.ai
Address: VitalGuard LLC Legal Department, 100 Enterprise Way, Suite 400, Wilmington, DE 19801`,
      },
    ],
  },

  terms: {
    id: 'terms',
    slug: 'terms-of-service',
    title: 'Terms of Service',
    category: 'Commercial & Platform Terms',
    icon: Scale,
    lastUpdated: 'October 13, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Governs the commercial licensing, acceptable use, clinical boundary disclaimers, and service level agreements for the VocoRx platform between VitalGuard LLC and subscribing pharmacies.',
    sections: [
      {
        id: 'agreement',
        heading: '1. Agreement & Acceptance',
        content: `These Terms of Service ("Terms") constitute a legally binding agreement between VitalGuard LLC ("VitalGuard," "we," "our") and the pharmacy, healthcare system, or organizational subscriber ("Customer," "you") accessing or utilizing the VocoRx autonomous Voice AI platform, APIs, software, and services (collectively, the "Platform").

By signing an Enterprise Order Form, executing a Business Associate Agreement, or utilizing the Platform in production or pilot mode, you confirm that you have legal authority to bind Customer to these Terms.`,
      },
      {
        id: 'clinical-disclaimer',
        heading: '2. Critical Clinical & Non-Medical Advice Disclaimer',
        content: `IMPORTANT NOTICE TO ALL PHARMACY SUBSCRIBERS:

• VocoRx is an administrative, operational, and conversational telephony software agent designed to facilitate routine pharmacy outreach, MedSync coordination, and appointment scheduling.
• VocoRx IS NOT A LICENSED PHARMACIST, PHYSICIAN, OR HEALTHCARE PROVIDER AND DOES NOT DISPENSE CLINICAL MEDICAL ADVICE, DIAGNOSES, OR PRESCRIPTION ORDERS.
• All clinical judgments, prescription dispensations, drug-utilization reviews (DUR), dosage verifications, and clinical consultations remain the exclusive responsibility of Customer's licensed Pharmacist-in-Charge (PIC) and authorized clinical staff.
• Customer acknowledges that the Platform incorporates automated clinical guardrails programmed to immediately warm-transfer or flag any clinical, adverse-event, or off-label inquiry to Customer's designated pharmacy staff.`,
      },
      {
        id: 'emergency-dialing',
        heading: '3. No Emergency Dialing (911 Limitations)',
        content: `THE PLATFORM DOES NOT REPLACE OR SUPPORT TRADITIONAL 911 EMERGENCY CALL HANDLING.

Customer must inform patients that VocoRx cannot process emergency calls. In the event that a patient indicates a life-threatening medical emergency during any automated conversation, the VocoRx agent is hard-coded to instruct the caller to hang up immediately and dial 911 or proceed to the nearest emergency medical facility.`,
      },
      {
        id: 'customer-obligations',
        heading: '4. Customer Responsibilities & TCPA Compliance',
        content: `Customer agrees to:

• Telephone Consumer Protection Act (TCPA) Compliance: Ensure that Customer has obtained all required patient consents, prior express consents, or healthcare treatment exemptions necessary under the TCPA, state telemarketing statutes, and pharmacy regulations before initiating automated outbound calls or SMS text messages.
• Accuracy of PMS Data: Maintain accurate, up-to-date medication, phone number, and patient status records within Customer's Pharmacy Management System (PMS).
• Secure Credentials: Secure all API keys, webhook secrets, and administrative login credentials utilized to access the VocoRx console and PMS connectors.
• Staff Availability for Escalations: Provide an active, staffed telephone line or SIP endpoint for real-time warm transfers during pharmacy operating hours.`,
      },
      {
        id: 'service-levels',
        heading: '5. Service Level Agreement (SLA) & Uptime',
        content: `VitalGuard provides an enterprise commitment of 99.99% monthly telephony and inference platform uptime for production environments, excluding scheduled maintenance windows announced at least 72 hours in advance.

In the event that the Platform fails to meet this availability target during any billing cycle, Customer shall be eligible for prorated service credits in accordance with Customer's Enterprise Order Form.`,
      },
      {
        id: 'ip-ownership',
        heading: '6. Intellectual Property & Customer Data Ownership',
        content: `• VitalGuard Proprietary Technology: VitalGuard LLC retains all right, title, and interest in and to the VocoRx Voice AI engines, voice synthesis pipelines, acoustic models, software connectors, trademarks, and documentation.
• Customer Data Ownership: Customer retains exclusive ownership of all Customer Data, patient health records, PMS database entries, and audio recordings processed through Customer's account. VitalGuard is granted only a limited, non-exclusive license to process such data strictly as necessary to deliver the Platform and comply with legal obligations.`,
      },
      {
        id: 'limitation-liability',
        heading: '7. Limitation of Liability & Indemnification',
        content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM USE OF THE PLATFORM.

Customer agrees to indemnify and hold harmless VitalGuard LLC, its officers, directors, and employees against any third-party claims arising from Customer's failure to obtain required TCPA patient consent, pharmacy licensing violations, or clinical malpractice determinations unrelated to software defects.`,
      },
      {
        id: 'governing-law',
        heading: '8. Governing Law & Dispute Resolution',
        content: `These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles. Any dispute arising from or relating to these Terms shall be resolved via confidential binding arbitration administered by JAMS in Wilmington, Delaware.`,
      },
    ],
  },

  hipaa: {
    id: 'hipaa',
    slug: 'hipaa-baa',
    title: 'HIPAA & BAA',
    category: 'Regulatory & Compliance',
    icon: ShieldAlert,
    lastUpdated: 'October 13, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Details our administrative, physical, and technical safeguards under HIPAA/HITECH, minimum necessary guidelines, and standard BAA provisions for Covered Entities.',
    sections: [
      {
        id: 'hipaa-statement',
        heading: '1. Commitment to HIPAA & HITECH Compliance',
        content: `VitalGuard LLC is fully committed to compliance with the Health Insurance Portability and Accountability Act of 1996 ("HIPAA"), the Health Information Technology for Economic and Clinical Health Act ("HITECH"), and the HIPAA Omnibus Final Rule.

Because VocoRx interfaces directly with Pharmacy Management Systems (PMS) and handles spoken Protected Health Information (PHI) over voice channels, VitalGuard executes a formal Business Associate Agreement (BAA) with every covered entity pharmacy prior to activating production integrations or processing live patient calls.`,
      },
      {
        id: 'business-associate',
        heading: '2. Business Associate Obligations',
        content: `Under our standard BAA, VitalGuard LLC agrees to:

• Prohibit Impermissible Uses: Not use or further disclose PHI other than as permitted or required by the BAA or as required by law.
• Employ Comprehensive Safeguards: Implement administrative, physical, and technical safeguards that reasonably and appropriately protect the confidentiality, integrity, and availability of electronic Protected Health Information (ePHI).
• Mitigate Harmful Effects: Mitigate, to the extent practicable, any harmful effect known to VitalGuard of a use or disclosure of PHI in violation of BAA requirements.
• Ensure Subcontractor Compliance: Require all downstream subcontractors (such as cloud hosting providers and telecom carriers) to agree in writing to the same restrictions and conditions that apply to VitalGuard.`,
      },
      {
        id: 'breach-notification',
        heading: '3. 24-Hour Breach Notification Standard',
        content: `In the event of any confirmed or reasonably suspected Breach of Unsecured Protected Health Information, VitalGuard adheres to an accelerated notification protocol:

• Notification Timeline: VitalGuard shall notify the affected Covered Entity within twenty-four (24) hours of discovering the breach—substantially faster than the 60-day federal statutory maximum.
• Incident Report Contents: Written notification shall include the identification of each individual whose PHI has been or is reasonably believed to have been breached, the nature and scope of the incident, the specific data elements involved, and immediate corrective steps taken to contain and remediate the vulnerability.`,
      },
      {
        id: 'technical-safeguards',
        heading: '4. Technical & Physical Safeguards',
        content: `VitalGuard enforces multi-layered technical controls aligned with 45 C.F.R. § 164.312:

• Encryption at Rest: All relational databases, audio storage buckets, call logs, and backups are encrypted using AES-256 with customer-managed keys via AWS KMS.
• Encryption in Transit: Real-time voice audio and web traffic utilize TLS 1.3, SRTP (Secure Real-Time Transport Protocol), and HTTPS with enforced HSTS and modern cipher suites.
• Access Control & Authentication: Mandatory role-based access control (RBAC), biometric hardware MFA, and automatic session revocation for administrative access.
• Minimum Necessary Rule: The Voice AI model is programmed to query and verbalize strictly the minimum necessary data elements required to accomplish each workflow (e.g. confirming patient DOB before disclosing medication names).`,
      },
      {
        id: 'audit-logging',
        heading: '5. Auditing, Accounting & Inspection Rights',
        content: `VitalGuard maintains comprehensive, immutable audit logs of all access to ePHI, recording:
• User or system entity identity
• Timestamp with millisecond precision
• Specific patient record or prescription accessed
• Nature of the transaction (create, read, update, write-back)

Upon reasonable advance written notice, Covered Entities possess the right to inspect VitalGuard's third-party SOC 2 Type II audit reports, HIPAA security assessments, and relevant compliance documentation.`,
      },
      {
        id: 'execution',
        heading: '6. Executing Your Business Associate Agreement',
        content: `A pre-signed Business Associate Agreement is incorporated into every VocoRx Enterprise Order Form. Pharmacies requiring a custom BAA or specific corporate legal addenda may request an enterprise legal review by contacting:

Compliance Office — VitalGuard LLC
Email: compliance@vocorx.ai
Direct: legal@vocorx.ai`,
      },
    ],
  },

  security: {
    id: 'security',
    slug: 'security-overview',
    title: 'Security & Technical Safeguards',
    category: 'Infrastructure & Architecture',
    icon: Lock,
    lastUpdated: 'October 13, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'A deep technical dive into VocoRx architecture, cryptography, cloud security, zero-retention voice pipelines, and continuous vulnerability management.',
    sections: [
      {
        id: 'architecture',
        heading: '1. Enterprise Infrastructure & Cloud Architecture',
        content: `VocoRx is engineered as a cloud-native, multi-tenant enterprise system deployed across redundant, HIPAA-eligible Tier IV availability zones in the United States (AWS GovCloud / US-East / US-West).

Tenant Isolation: Every pharmacy account is logically isolated with dedicated tenant encryption partitions, preventing cross-tenant data leakage. Database access is mediated through strict attribute-based access controls (ABAC).`,
      },
      {
        id: 'encryption-standards',
        heading: '2. Cryptographic Specifications',
        content: `• Data in Transit: 100% of external and internal service-to-service communications are encrypted using TLS 1.3 with forward secrecy. Telephony SIP signaling and audio RTP packets utilize SIP-over-TLS and SRTP with AES-128/256 cipher suites.
• Data at Rest: Stored databases, audio records, and ephemeral disks are protected using AES-256 block encryption. Key management is handled through AWS Key Management Service (KMS) with automated annual rotation and optional Customer Managed Keys (CMK).`,
      },
      {
        id: 'voice-pipeline-security',
        heading: '3. Real-Time Voice Processing Security',
        content: `VocoRx processes conversational audio through a low-latency, secure streaming pipeline:

• Ephemeral Buffer Execution: Spoken speech audio streams into memory buffers for real-time acoustic analysis and transcription. Raw audio is never persisted on unencrypted disk buffers.
• Zero-Retention Inference: Conversational understanding and speech synthesis occur across private compute clusters where prompts and outputs are discarded immediately after response synthesis.
• Encrypted Archival: Call recordings (where authorized by the pharmacy for compliance and QA) are encrypted in transit and at rest in restricted private S3 buckets with lifecycle deletion rules.`,
      },
      {
        id: 'identity-access',
        heading: '4. Identity & Access Management (IAM)',
        content: `• Single Sign-On (SSO): Support for enterprise identity providers including Okta, Microsoft Entra ID (Azure AD), Google Workspace, and PingFederate via SAML 2.0 and OpenID Connect (OIDC).
• Multi-Factor Authentication (MFA): Enforced FIDO2/WebAuthn hardware keys or TOTP authenticator apps for all pharmacy administrative users and VitalGuard engineers.
• Least-Privilege Architecture: VitalGuard operational staff do not have default access to customer production databases. Temporary emergency access requires dual-authorization and generates immutable SIEM alerts.`,
      },
      {
        id: 'threat-monitoring',
        heading: '5. Continuous Threat Monitoring & Penetration Testing',
        content: `• 24/7 Security Operations Center (SOC): Automated ingestion of system, network, and application logs into a centralized SIEM with behavioral anomaly detection.
• Web Application Firewall & DDoS Shield: Cloudflare Magic Transit and AWS WAF provide layer 3/4/7 DDoS mitigation, credential stuffing protection, and rate limiting.
• Annual Third-Party Penetration Testing: Independent CREST-accredited security firms perform black-box, white-box, and API penetration tests at least annually. Summaries are available under NDA.`,
      },
      {
        id: 'business-continuity',
        heading: '6. Disaster Recovery & High Availability',
        content: `• High Availability SLA: 99.99% operational uptime backed by geo-redundant telephony trunks and auto-scaling Kubernetes clusters.
• Recovery Point Objective (RPO): Less than 15 minutes via continuous asynchronous database replication across distinct availability zones.
• Recovery Time Objective (RTO): Less than 1 hour for full regional failover.`,
      },
    ],
  },

  accessibility: {
    id: 'accessibility',
    slug: 'accessibility',
    title: 'Accessibility Statement',
    category: 'Inclusion & Universal Access',
    icon: Accessibility,
    lastUpdated: 'October 13, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Our commitment to ensuring that VocoRx voice interactions and web interfaces are universally accessible to patients, pharmacists, and staff of all abilities.',
    sections: [
      {
        id: 'commitment',
        heading: '1. Our Universal Accessibility Commitment',
        content: `VitalGuard LLC is committed to ensuring digital accessibility for patients, pharmacists, and pharmacy technicians of all abilities. We believe that critical healthcare communications—such as prescription refill reminders, MedSync coordination, and dosage instructions—must be barrier-free and universally understandable.

We continually test and improve both our conversational Voice AI engine and our web management portal against the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and Section 508 of the U.S. Rehabilitation Act.`,
      },
      {
        id: 'voice-accessibility',
        heading: '2. Voice AI & Auditory Accessibility Features',
        content: `Given that our primary product operates over telephone channels, we have incorporated specialized acoustic and linguistic optimizations for elderly individuals and individuals with hearing or speech challenges:

• Acoustic Tuning for Hearing Aids: Synthetic voices are balanced with enhanced formant clarity and suppressed sibilance, specifically optimized for frequency response ranges typical of digital hearing aids.
• Adaptive Pacing & Repetition: The VocoRx agent automatically detects hesitation or clarification requests ("Could you repeat that?", "What did you say?") and responds at a slower rate with simplified sentence structure.
• Confirmation Prompts: Critical details—including prescription names, pickup dates, and store addresses—are explicitly re-confirmed before completing the interaction.
• TTY & Telecommunications Relay Service (TRS) Compatibility: The voice platform accepts calls routed through 711 TRS operators and TTY equipment without audio clipping.`,
      },
      {
        id: 'multi-modal-parity',
        heading: '3. Multi-Modal Parity (Voice + SMS Transcripts)',
        content: `For patients who are deaf, hard of hearing, or who prefer written communication:

• Immediate SMS Option: At the beginning of any outreach attempt or via patient profile settings, patients can elect to receive all MedSync schedules, refill authorizations, and confirmations via accessible SMS text messages instead of voice calls.
• Screen Reader Optimized Web Portals: Patient-facing confirmation links feature semantic HTML, WCAG-compliant color contrast (greater than 4.5:1), and full compatibility with screen readers including JAWS, NVDA, VoiceOver, and TalkBack.`,
      },
      {
        id: 'web-standards',
        heading: '4. Web Portal Technical Conformance',
        content: `The VocoRx pharmacy administrative dashboard incorporates:
• Keyboard Navigation: Full operational capability using Tab, Shift+Tab, and Enter keys without keyboard traps.
• Visible Focus Indicators: High-contrast cyan focus rings on all interactive inputs, buttons, and scenario controls.
• Reduced Motion Respect: Native integration with the CSS prefers-reduced-motion media query, disabling canvas wave animations and 3D card tilt for vestibular disorder accommodation.
• Semantic Landmarks: ARIA roles, live regions for real-time transcript updates, and hierarchical header trees for assistive screen readers.`,
      },
      {
        id: 'feedback',
        heading: '5. Feedback & Accessibility Contact',
        content: `We welcome feedback on the accessibility of VocoRx. If you encounter any auditory, visual, or operational barrier while using our platform, please reach out to our Accessibility Coordinator:

VitalGuard LLC — Accessibility Team
Email: accessibility@vocorx.ai
Phone: (800) 555-VOCO
Support Hours: Monday – Friday, 8:00 AM – 8:00 PM EST`,
      },
    ],
  },

  cookies: {
    id: 'cookies',
    slug: 'cookie-settings',
    title: 'Cookie & Tracking Notice',
    category: 'Privacy & Telemetry',
    icon: Cookie,
    lastUpdated: 'October 13, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Explains our strictly essential cookie policy, lack of third-party advertising pixels, and how we protect pharmacy and patient browsing sessions.',
    sections: [
      {
        id: 'philosophy',
        heading: '1. Minimalist Tracking Philosophy',
        content: `At VitalGuard LLC, our approach to web cookies and digital telemetry is guided by our healthcare heritage: we collect only what is strictly necessary to deliver a secure, functional, and reliable software experience.

WE DO NOT DEPLOY THIRD-PARTY BEHAVIORAL ADVERTISING COOKIES, TRACKING PIXELS (SUCH AS META PIXEL OR GOOGLE ADS TAGS), OR DATA-BROKER SCRIPTS ON ANY VOCORX PATIENT INTERFACE OR AUTHENTICATED PHARMACY PORTAL.`,
      },
      {
        id: 'categories',
        heading: '2. Cookie Categories We Utilize',
        content: `• Strictly Necessary Cookies: Essential for platform security, user authentication, CSRF token validation, and load balancing across our distributed application servers. These cannot be disabled without breaking core functionality.
• Functional & Preference Cookies: Remembers your interface settings, such as your audio playback volume, scenario playground selections, and prefers-reduced-motion accessibility overrides.
• Privacy-Preserving Performance Analytics: Aggregated, anonymized telemetry (e.g. measuring page load times, UI error rates) collected with anonymized IP addresses to ensure platform reliability.`,
      },
      {
        id: 'managing-cookies',
        heading: '3. Managing Your Browser Cookies',
        content: `You can control and manage cookies through your browser settings. Most modern browsers allow you to:
• View which cookies are stored on your device and delete them individually.
• Block third-party cookies or block all cookies entirely.
• Set your browser to delete all cookies whenever you close your browser window.

Please note that disabling strictly necessary cookies may prevent authentication to the VocoRx pharmacy administration dashboard.`,
      },
      {
        id: 'cookie-contact',
        heading: '4. Questions Regarding Cookies',
        content: `If you have questions regarding our cookie practices or data privacy controls, please email:
VitalGuard LLC Security & Privacy Operations
Email: privacy@vocorx.ai`,
      },
    ],
  },
};
