import { FileText, ShieldAlert, Lock, Scale, Accessibility, Cookie } from 'lucide-react';

export const LEGAL_DOCS = {
  privacy: {
    id: 'privacy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    category: 'Privacy & Data Protection',
    icon: FileText,
    lastUpdated: 'October 15, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Explains how VitalGuard LLC collects, protects, processes, and restricts use of Protected Health Information (PHI), insured tracking records, and personal data across VocoLS Voice AI deployments.',
    sections: [
      {
        id: 'overview',
        heading: '1. Overview & Entity Information',
        content: `This Privacy Policy outlines the practices and policies of VitalGuard LLC ("VitalGuard," "VocoLS," "we," "us," or "our") regarding the collection, use, transmission, and safeguarding of information obtained through our autonomous Voice AI insured tracking platform, website, APIs, and associated policy administration system integrations.

VocoLS operates as a technology service provider and Business Associate to licensed life settlement providers, life settlement maintenance and servicing companies, institutional funds, and authorized portfolio investors (collectively, "Authorized Entities"). We treat all insured records, policy metadata, medical updates, voice audio recordings, and call transcripts with the highest standards of privacy, data minimization, and regulatory compliance.`,
      },
      {
        id: 'phi-distinction',
        heading: '2. Protected Health Information (PHI) & Insured Data vs. General Data',
        content: `We clearly delineate between two distinct classifications of data:

• Protected Health Information (PHI) & Insured Tracking Data: Identifiable insured data—including insured names, phone numbers, dates of birth, residential addresses, designated contact hierarchies, attending physician names, hospitalization records, health status responses, and audio streams of tracking calls. When handling PHI and insured data on behalf of Authorized Entities, VitalGuard LLC acts strictly under executed Business Associate Agreements (BAAs), HIPAA authorizations signed by the insured, and applicable state life settlement privacy statutes.

• General Commercial Data: Contact information of servicing administrators, fund managers, website visitor telemetry, and billing details for institutional accounts.`,
      },
      {
        id: 'collection',
        heading: '3. Information We Collect and Process',
        content: `In delivering persistent autonomous insured tracking and follow-up verification services, VocoLS processes:

• Bidirectional Portfolio & Servicing Data: Insured contact profiles, designated secondary contacts, policy identifiers, tracking schedules, and historical physician lists synchronized via secure REST APIs, webhooks, or encrypted SFTP batch interfaces.
• Telephony Audio & Transcripts: Real-time audio streams generated during automated outbound insured tracking calls or inbound callbacks, alongside cryptographically encrypted call recordings and structured transcripts.
• Identity & Contact Verification Metadata: Insured- or POA-provided confirmation attributes (such as date of birth, current street address, or secondary contact verification) collected strictly to authenticate identity prior to conducting health status questionnaires.
• Dynamic Follow-Up Responses: Granular clinical updates captured when an insured reports a medical event, including hospital facility names, admission dates, specialist physician names, diagnoses, and newly prescribed therapies.
• Telemetry & Audit Logs: Call attempt histories, time-of-day retry logs, connection durations, and telephony carrier disposition codes for regulatory and investor audit compliance.`,
      },
      {
        id: 'ai-training',
        heading: '4. AI Model Training & Zero-Data-Retention Safeguards',
        content: `VitalGuard LLC maintains a strict, contractual guarantee regarding artificial intelligence inference:

• Zero Foundation Training: Neither insured voice audio, nor raw call transcripts, nor portfolio health records are ever used to train, retrain, or fine-tune public foundation AI models (such as commercial LLMs or general-purpose speech models).
• Isolated Inference Pipelines: Voice transcription, dynamic follow-up intent extraction, and conversational synthesis occur within isolated, HIPAA-compliant Virtual Private Clouds (VPC) under zero-retention enterprise agreements.
• De-Identification: Any internal telemetry used for system reliability, acoustic tuning, or latency benchmarking is stripped of all eighteen (18) HIPAA identifiers in accordance with the HIPAA Safe Harbor De-Identification standard (45 C.F.R. § 164.514(b)).`,
      },
      {
        id: 'use-of-info',
        heading: '5. How We Use Information',
        content: `Information processed by VocoLS is used strictly for authorized life settlement servicing and portfolio maintenance purposes:

• Executing persistent, dial-until-reached outbound phone calls to insureds and authorized designated contacts for scheduled wellness, address, and physician verification check-ins.
• Asking all mandatory tracking questions and dynamically branching into necessary clinical follow-up questions when health or physician changes are disclosed.
• Writing verified address updates, attending physician changes, hospitalization details, and APS triggers directly back into the servicer's or fund's policy administration system.
• Triaging and immediately escalating sensitive bereavement or mortality notifications to designated human claims specialists.`,
      },
      {
        id: 'sharing',
        heading: '6. Information Sharing & Third Parties',
        content: `VitalGuard LLC does not sell, rent, monetize, or trade insured data, PHI, or portfolio lists under any circumstances. Data is disclosed only to:

• The authorizing life settlement maintenance company, provider, trustee, or fund that holds valid legal and HIPAA authorization to track the policy.
• Verified Subcontractors (e.g., enterprise cloud infrastructure hosts, SOC 2 Type II compliant SIP telephony carriers) who are contractually bound by signed BAAs and strict confidentiality obligations.
• Legal and regulatory bodies where strictly required by applicable federal, state Department of Insurance, or judicial subpoenas.`,
      },
      {
        id: 'retention-disposal',
        heading: '7. Data Retention & Secure Cryptographic Disposal',
        content: `All insured tracking records and PHI are retained only for the duration specified in the governing enterprise servicing agreement or as required by applicable state life settlement record-keeping statutes.

Upon contract termination or upon receipt of a written directive from the Authorized Entity, all electronic PHI, voice audio files, and encrypted transcript records are permanently purged from active and backup databases using cryptographic erasure methods aligned with NIST Special Publication 800-88 Revision 1 (Guidelines for Media Sanitization).`,
      },
      {
        id: 'patient-rights',
        heading: '8. Insured Rights & Privacy Inquiries',
        content: `Insured individuals or designated representatives wishing to review, update, or revoke authorization regarding their contact preferences or Protected Health Information should contact their designated policy servicer or our privacy office. VitalGuard LLC collaborates with servicers and funds to fulfill all verified requests within statutory timeframes.

For general privacy inquiries or to reach our Data Protection Officer, email us at:
VitalGuard LLC — VocoLS Data Protection Office
Email: privacy@vocols.ai
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
    lastUpdated: 'October 15, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Governs the commercial licensing, regulatory compliance obligations, acceptable use, and service level agreements for the VocoLS platform between VitalGuard LLC and subscribing servicers, funds, and investors.',
    sections: [
      {
        id: 'agreement',
        heading: '1. Agreement & Acceptance',
        content: `These Terms of Service ("Terms") constitute a legally binding agreement between VitalGuard LLC ("VitalGuard," "we," "our") and the life settlement maintenance company, provider, fund, or institutional investor ("Customer," "you") accessing or utilizing the VocoLS autonomous Voice AI insured tracking platform, APIs, software, and services (collectively, the "Platform").

By signing an Enterprise Order Form, executing a Business Associate Agreement, or utilizing the Platform in production or pilot mode, you confirm that you have legal authority to bind Customer to these Terms.`,
      },
      {
        id: 'clinical-disclaimer',
        heading: '2. Scope of Insured Tracking & Non-Medical / Non-Actuarial Disclaimer',
        content: `IMPORTANT NOTICE TO ALL SUBSCRIBERS:

• VocoLS is an administrative, operational, and conversational telephony software agent designed to automate routine insured contact verification, address confirmation, and structured health questionnaire outreach.
• VocoLS IS NOT A LICENSED PHYSICIAN, MEDICAL PROVIDER, OR LIFE EXPECTANCY UNDERWRITER AND DOES NOT PROVIDE MEDICAL ADVICE OR FORMAL ACTUARIAL LIFE EXPECTANCY CERTIFICATIONS.
• All life expectancy (LE) projections, Attending Physician Statement (APS) ordering decisions, policy valuations, and death claim filings remain the exclusive responsibility of Customer and its licensed underwriting or servicing personnel.
• Customer acknowledges that the Platform incorporates automated escalation guardrails programmed to immediately warm-transfer or alert Customer's designated staff when a bereavement/mortality event or complex servicing request is reported.`,
      },
      {
        id: 'emergency-dialing',
        heading: '3. Regulatory & State Contact Frequency Compliance',
        content: `LIFE SETTLEMENT TRACKING COMPLIANCE:

While VocoLS provides persistent "call-until-reached" capabilities to eliminate unanswered outreach attempts, once a live verification is completed, the Platform automatically enforces statutory cooling-off periods in accordance with applicable state life settlement regulations (such as NAIC / NCOIL model act contact frequency limits for quarterly or monthly health status contacts, depending on insured life expectancy) unless configured otherwise by Customer for authorized callbacks.`,
      },
      {
        id: 'customer-obligations',
        heading: '4. Customer Responsibilities, HIPAA Authorizations & TCPA Compliance',
        content: `Customer agrees to:

• Valid Tracking & HIPAA Authorizations: Ensure that Customer holds valid, unexpired legal authority and signed HIPAA / life settlement tracking consents from each insured (or their authorized legal representative) before queuing policies for outbound tracking calls.
• Telephone Consumer Protection Act (TCPA) Compliance: Ensure that all phone numbers provided for insureds and designated contacts carry appropriate consent for policy servicing communications.
• Accuracy of Portfolio Data: Maintain accurate policy records, insured names, and historical physician data within Customer's servicing system.
• Staff Availability for Escalations: Provide an active, staffed telephone line or SIP endpoint for real-time warm transfers during operating hours when mortality events or urgent family inquiries occur.`,
      },
      {
        id: 'service-levels',
        heading: '5. Service Level Agreement (SLA) & Uptime',
        content: `VitalGuard provides an enterprise commitment of 99.99% monthly telephony and inference platform uptime for production environments, excluding scheduled maintenance windows announced at least 72 hours in advance.

In the event that the Platform fails to meet this availability target during any billing cycle, Customer shall be eligible for prorated service credits in accordance with Customer's Enterprise Order Form.`,
      },
      {
        id: 'ip-ownership',
        heading: '6. Intellectual Property & Portfolio Data Ownership',
        content: `• VitalGuard Proprietary Technology: VitalGuard LLC retains all right, title, and interest in and to the VocoLS Voice AI engines, dynamic follow-up questioning logic, voice synthesis pipelines, software connectors, trademarks, and documentation.
• Customer Data Ownership: Customer retains exclusive ownership of all Customer Data, policy portfolios, insured health deltas, transcripts, and audio recordings processed through Customer's account. VitalGuard is granted only a limited, non-exclusive license to process such data strictly as necessary to deliver the Platform and comply with legal obligations.`,
      },
      {
        id: 'limitation-liability',
        heading: '7. Limitation of Liability & Indemnification',
        content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES (INCLUDING PORTFOLIO IRR FLUCTUATIONS OR POLICY VALUATION VARIANCES) ARISING FROM USE OF THE PLATFORM.

Customer agrees to indemnify and hold harmless VitalGuard LLC, its officers, directors, and employees against any third-party claims arising from Customer's failure to maintain valid insured tracking authorizations, state licensing violations, or unlawful contact directives.`,
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
    lastUpdated: 'October 15, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Details our administrative, physical, and technical safeguards under HIPAA/HITECH, state life settlement privacy laws, and standard BAA provisions for servicers and funds.',
    sections: [
      {
        id: 'hipaa-statement',
        heading: '1. Commitment to HIPAA, HITECH & Life Settlement Privacy',
        content: `VitalGuard LLC is fully committed to compliance with the Health Insurance Portability and Accountability Act of 1996 ("HIPAA"), the Health Information Technology for Economic and Clinical Health Act ("HITECH"), and state life settlement privacy statutes.

Because VocoLS interfaces directly with policy servicing platforms and handles spoken Protected Health Information (PHI) and medical follow-up questionnaires over voice channels, VitalGuard executes a formal Business Associate Agreement (BAA) and Confidentiality Agreement with every subscribing maintenance company, provider, or fund prior to activating production tracking.`,
      },
      {
        id: 'business-associate',
        heading: '2. Business Associate & Servicer Safeguard Obligations',
        content: `Under our standard BAA, VitalGuard LLC agrees to:

• Prohibit Impermissible Uses: Not use or further disclose PHI or insured tracking records other than as permitted or required by the BAA/Servicing Agreement or as required by law.
• Employ Comprehensive Safeguards: Implement administrative, physical, and technical safeguards that reasonably and appropriately protect the confidentiality, integrity, and availability of electronic Protected Health Information (ePHI) and insured identity data.
• Mitigate Harmful Effects: Mitigate, to the extent practicable, any harmful effect known to VitalGuard of a use or disclosure of PHI in violation of BAA requirements.
• Ensure Subcontractor Compliance: Require all downstream subcontractors (such as cloud hosting providers and telecom carriers) to agree in writing to the same restrictions and conditions that apply to VitalGuard.`,
      },
      {
        id: 'breach-notification',
        heading: '3. 24-Hour Breach Notification Standard',
        content: `In the event of any confirmed or reasonably suspected Breach of Unsecured Protected Health Information or insured portfolio records, VitalGuard adheres to an accelerated notification protocol:

• Notification Timeline: VitalGuard shall notify the affected Customer within twenty-four (24) hours of discovering the breach—substantially faster than the 60-day federal statutory maximum.
• Incident Report Contents: Written notification shall include the identification of each policy/insured whose PHI has been or is reasonably believed to have been affected, the nature and scope of the incident, the specific data elements involved, and immediate corrective steps taken to contain and remediate the vulnerability.`,
      },
      {
        id: 'technical-safeguards',
        heading: '4. Technical & Physical Safeguards',
        content: `VitalGuard enforces multi-layered technical controls aligned with 45 C.F.R. § 164.312:

• Encryption at Rest: All relational databases, call recording storage buckets, transcript logs, and backups are encrypted using AES-256 with customer-managed keys via AWS KMS.
• Encryption in Transit: Real-time voice audio and web traffic utilize TLS 1.3, SRTP (Secure Real-Time Transport Protocol), and HTTPS with enforced HSTS and modern cipher suites.
• Access Control & Authentication: Mandatory role-based access control (RBAC), biometric hardware MFA, and automatic session revocation for administrative access.
• Identity Verification Gate: The Voice AI model is programmed to verify the insured's or designated contact's identity (e.g. confirming DOB and address) before referencing specific historical physicians or health records.`,
      },
      {
        id: 'audit-logging',
        heading: '5. Auditing, Accounting & Investor Due Diligence Rights',
        content: `VitalGuard maintains comprehensive, immutable audit logs of all access to ePHI and policy tracking records, recording:
• User or system entity identity
• Timestamp with millisecond precision
• Specific insured record or policy accessed
• Full call attempt history, audio recording hash, and transcript write-back status

Upon reasonable advance written notice, subscribing servicers, funds, and institutional investors possess the right to inspect VitalGuard's third-party SOC 2 Type II audit reports, HIPAA security assessments, and relevant compliance documentation for fund due diligence.`,
      },
      {
        id: 'execution',
        heading: '6. Executing Your Business Associate Agreement',
        content: `A pre-signed Business Associate Agreement is incorporated into every VocoLS Enterprise Order Form. Maintenance companies, trustees, and institutional funds requiring a custom BAA or specific fund legal addenda may request an enterprise legal review by contacting:

Compliance Office — VitalGuard LLC
Email: compliance@vocols.ai
Direct: legal@vocols.ai`,
      },
    ],
  },

  security: {
    id: 'security',
    slug: 'security-overview',
    title: 'Security & Technical Safeguards',
    category: 'Infrastructure & Architecture',
    icon: Lock,
    lastUpdated: 'October 15, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'A deep technical dive into VocoLS architecture, cryptography, fund tenant isolation, zero-retention voice pipelines, and continuous vulnerability management.',
    sections: [
      {
        id: 'architecture',
        heading: '1. Enterprise Infrastructure & Fund Tenant Isolation',
        content: `VocoLS is engineered as a cloud-native, multi-tenant enterprise system deployed across redundant, HIPAA-eligible Tier IV availability zones in the United States (AWS US-East / US-West).

Tenant & Portfolio Isolation: Every maintenance company and institutional fund account is logically isolated with dedicated tenant encryption partitions, preventing cross-portfolio data leakage. Database access is mediated through strict attribute-based access controls (ABAC).`,
      },
      {
        id: 'encryption-standards',
        heading: '2. Cryptographic Specifications',
        content: `• Data in Transit: 100% of external and internal service-to-service communications are encrypted using TLS 1.3 with forward secrecy. Telephony SIP signaling and audio RTP packets utilize SIP-over-TLS and SRTP with AES-128/256 cipher suites.
• Data at Rest: Stored databases, call recordings, transcripts, and ephemeral disks are protected using AES-256 block encryption. Key management is handled through AWS Key Management Service (KMS) with automated annual rotation and optional Customer Managed Keys (CMK).`,
      },
      {
        id: 'voice-pipeline-security',
        heading: '3. Real-Time Voice Processing & Audit Archival',
        content: `VocoLS processes conversational tracking audio through a low-latency, secure streaming pipeline:

• Ephemeral Buffer Execution: Spoken speech audio streams into memory buffers for real-time acoustic analysis and transcription. Raw audio is never persisted on unencrypted disk buffers.
• Zero-Retention Inference: Conversational understanding, dynamic follow-up generation, and speech synthesis occur across private compute clusters where prompts and outputs are never retained by third-party AI vendors.
• Encrypted Audit Archival: Full call recordings and structured transcripts (required for life settlement servicing verification and fund audits) are encrypted in transit and at rest in restricted private S3 buckets with configurable retention rules.`,
      },
      {
        id: 'identity-access',
        heading: '4. Identity & Access Management (IAM)',
        content: `• Single Sign-On (SSO): Support for enterprise identity providers including Okta, Microsoft Entra ID (Azure AD), Google Workspace, and PingFederate via SAML 2.0 and OpenID Connect (OIDC).
• Multi-Factor Authentication (MFA): Enforced FIDO2/WebAuthn hardware keys or TOTP authenticator apps for all servicing administrative users and VitalGuard engineers.
• Least-Privilege Architecture: VitalGuard operational staff do not have default access to customer production portfolios. Temporary support access requires dual-authorization and generates immutable SIEM alerts.`,
      },
      {
        id: 'threat-monitoring',
        heading: '5. Continuous Threat Monitoring & Penetration Testing',
        content: `• 24/7 Security Operations Center (SOC): Automated ingestion of system, network, and application logs into a centralized SIEM with behavioral anomaly detection.
• Web Application Firewall & DDoS Shield: Cloudflare Magic Transit and AWS WAF provide layer 3/4/7 DDoS mitigation, credential stuffing protection, and rate limiting.
• Annual Third-Party Penetration Testing: Independent CREST-accredited security firms perform black-box, white-box, and API penetration tests at least annually. Summaries are available to institutional investors under NDA.`,
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
    category: 'Inclusion & Senior-Friendly Design',
    icon: Accessibility,
    lastUpdated: 'October 15, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Our commitment to ensuring that VocoLS voice interactions are acoustically and conversationally tailored for senior insureds, and that our web portals meet WCAG 2.1 AA.',
    sections: [
      {
        id: 'commitment',
        heading: '1. Our Senior-First Accessibility Commitment',
        content: `VitalGuard LLC is committed to ensuring accessibility for senior insureds, designated family contacts, and servicing analysts of all abilities. Because life settlement tracking primarily involves communicating with elderly insured populations, our voice interface is purpose-built for clarity, patience, and auditory comfort.

We continually test and improve both our conversational Voice AI engine and our web management portal against the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and Section 508 of the U.S. Rehabilitation Act.`,
      },
      {
        id: 'voice-accessibility',
        heading: '2. Senior-Optimized Voice AI & Auditory Features',
        content: `Given that our primary product communicates with senior insureds over telephone channels, we have incorporated specialized acoustic and linguistic optimizations:

• Acoustic Tuning for Hearing Aids: Synthetic voices are balanced with warm formant clarity and suppressed sibilance, specifically optimized for frequency response ranges typical of digital hearing aids and landline handsets.
• Patient Pacing & Zero Rush: Unlike human call-center agents incentivized by short handle times, VocoLS never rushes an insured. It automatically detects hesitation or clarification requests ("Could you repeat that?", "Hold on a second") and responds at a calm, unhurried pace.
• Explicit Confirmation Prompts: Critical details—including residential addresses, doctor names, and hospital dates—are politely repeated back to confirm accuracy.
• TTY & Telecommunications Relay Service (TRS) Compatibility: The voice platform seamlessly supports calls routed through 711 TRS operators and captioned telephone (CapTel) equipment.`,
      },
      {
        id: 'multi-modal-parity',
        heading: '3. Multi-Modal Parity (Voice + Written Confirmations)',
        content: `For insureds or designated contacts who are hard of hearing or prefer written follow-up:

• SMS & Mail Fallback Coordination: Insureds or authorized POAs can elect to receive supplementary SMS confirmation links or trigger paper mail questionnaires when preferred.
• Screen Reader Optimized Portals: Web-based verification forms feature semantic HTML, high-contrast typography (greater than 4.5:1), and full compatibility with JAWS, NVDA, VoiceOver, and TalkBack.`,
      },
      {
        id: 'web-standards',
        heading: '4. Web Portal Technical Conformance',
        content: `The VocoLS servicing and fund dashboard incorporates:
• Keyboard Navigation: Full operational capability using Tab, Shift+Tab, and Enter keys without keyboard traps.
• Visible Focus Indicators: High-contrast cyan focus rings on all interactive inputs, buttons, and scenario controls.
• Reduced Motion Respect: Native integration with the CSS prefers-reduced-motion media query, disabling canvas wave animations and 3D card tilt for vestibular disorder accommodation.
• Semantic Landmarks: ARIA roles, live regions for real-time transcript updates, and hierarchical header trees for assistive screen readers.`,
      },
      {
        id: 'feedback',
        heading: '5. Feedback & Accessibility Contact',
        content: `We welcome feedback on the accessibility of VocoLS. If you encounter any auditory, visual, or operational barrier while using our platform, please reach out to our Accessibility Coordinator:

VitalGuard LLC — Accessibility Team
Email: accessibility@vocols.ai
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
    lastUpdated: 'October 15, 2026',
    effectiveDate: 'October 1, 2026',
    summary: 'Explains our strictly essential web cookie policy, lack of third-party advertising pixels, and how we protect servicer, fund, and insured browsing sessions.',
    sections: [
      {
        id: 'philosophy',
        heading: '1. Minimalist Web Telemetry Philosophy',
        content: `At VitalGuard LLC, our approach to web cookies and digital telemetry is guided by institutional privacy standards: we collect only what is strictly necessary to deliver a secure, functional, and reliable software experience.

WE DO NOT DEPLOY THIRD-PARTY BEHAVIORAL ADVERTISING COOKIES, TRACKING PIXELS (SUCH AS META PIXEL OR GOOGLE ADS TAGS), OR DATA-BROKER SCRIPTS ON ANY VOCOLS INSURED INTERFACE OR AUTHENTICATED SERVICER/FUND PORTAL.`,
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

Please note that disabling strictly necessary cookies may prevent authentication to the VocoLS servicing administration dashboard.`,
      },
      {
        id: 'cookie-contact',
        heading: '4. Questions Regarding Cookies',
        content: `If you have questions regarding our cookie practices or data privacy controls, please email:
VitalGuard LLC Security & Privacy Operations
Email: privacy@vocols.ai`,
      },
    ],
  },
};
