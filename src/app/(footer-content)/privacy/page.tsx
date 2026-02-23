import { chivasLoudMedium } from "@/fonts";
import { FooterContentLayout } from "@/components";

export default function Privacy() {
  return (
    <FooterContentLayout subtitle="PRIVACY POLICY">
      <div className="md:px-10">
        <div
          className={`text-sm leading-relaxed text-white md:text-base ${chivasLoudMedium.className}`}
        >
          <p className="mb-4">Last update: August 2025</p>

          <h3 className="mt-6 mb-2 font-semibold">Introduction</h3>
          <p className="mb-4">
            Chivas Brothers International Limited (&quot;Company&quot;, &quot;we&quot;,
            &quot;our&quot;, &quot;us&quot;) respects your right to privacy when you use our Event
            Concierge Platform (including our websites, mobile applications, registration forms, and
            any digital communications &ndash; together the &quot;Platform&quot;) and communicate
            electronically with us.
          </p>
          <p className="mb-2">
            This privacy policy (the &quot;Privacy Policy&quot;) applies to the following persons
            (&quot;you&quot;):
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>All event attendees using our Platform</li>
            <li>Participants registering for events</li>
            <li>Recipients of event-related communications</li>
            <li>Users accessing personalized itineraries</li>
            <li>Emergency contacts listed by attendees</li>
          </ul>
          <p className="mb-4">
            The purpose of this Privacy Policy is to inform you how Chivas Brothers International
            Limited collects, stores and uses the personal data collected from you.
          </p>
          <p className="mb-4">
            This Privacy Policy may be updated at any time as a result of, among others, legal,
            technical or commercial changes. We will notify you, by appropriate means, of any
            substantive change in this Privacy Policy. You are also invited to regularly read this
            Privacy Policy to make sure you are aware of the latest version.
          </p>

          <h3 className="mt-6 mb-2 font-semibold">
            1. WHO IS THE DATA CONTROLLER FOR THE PROCESSING OF YOUR PERSONAL DATA?
          </h3>
          <p className="mb-4">
            Chivas Brothers International Limited, a corporation duly organized under the laws of
            England and Wales, with its registered address at Pernod Ricard Middle East, DIFC
            Branch, ICD Brookfield Place, Dubai International Financial Centre (DIFC), United Arab
            Emirates (&quot;Company&quot; or &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) acts
            as the &quot;data controller&quot; for the processing of your personal data (i.e. it is
            the entity that determines &quot;why&quot; and &quot;how&quot; your personal data are
            used).
          </p>
          <p className="mb-4">
            Please note that we may process personal data on behalf of event organizers who use our
            Platform. In such cases, the event organizer may be a joint data controller for certain
            processing activities.
          </p>

          <h3 className="mt-6 mb-2 font-semibold">
            2. WHAT PERSONAL DATA DO WE COLLECT ABOUT YOU AND HOW?
          </h3>
          <p className="mb-4">
            &quot;Personal data&quot; refers to any information that may identify you directly
            (e.g., your name) or indirectly (e.g., your phone number, email address, or unique
            identifier).
          </p>
          <p className="mb-4">
            We collect personal data directly from you when you register for events, create
            accounts, update your profile, or interact with our Platform features.
          </p>
          <p className="mb-2">
            Depending on the purposes of collection, personal data collected includes:
          </p>
          <p className="mb-2 font-semibold">Basic Information</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>
              Name, gender, and contact details (postal address, email address, phone numbers)
            </li>
            <li>Guest type/category for the event</li>
            <li>Business contact details (where applicable)</li>
          </ul>
          <p className="mb-2 font-semibold">Travel &amp; Accommodation</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>Accommodation requirements and preferences</li>
            <li>Transfer requirements (including accessibility needs)</li>
          </ul>
          <p className="mb-2 font-semibold">Personal Requirements</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>Dietary requirements and restrictions</li>
            <li>Medical requirements and conditions requiring special attention</li>
            <li>Accessibility requirements</li>
            <li>Merchandise sizes (shirt, jacket, hat)</li>
          </ul>
          <p className="mb-2 font-semibold">Emergency Information</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>Emergency contact details (name, relationship, phone, email)</li>
          </ul>
          <p className="mb-2 font-semibold">Technical Data</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>IP address</li>
            <li>Location data (when accessing itineraries)</li>
            <li>Platform usage data</li>
            <li>Session information and access logs</li>
          </ul>
          <p className="mb-2 font-semibold">Communication Preferences</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>Preferred communication channels (email, WhatsApp, SMS)</li>
            <li>Opt-in/opt-out preferences</li>
          </ul>
          <p className="mb-4">
            The personal data collected is necessary to achieve the purposes described in Section 3
            below. If you do not provide the personal data we request, it may prevent us from
            providing you with event services and personalized itineraries.
          </p>

          <h3 className="mt-6 mb-2 font-semibold">
            3. FOR WHAT PURPOSES AND ON WHAT LEGAL BASIS ARE PERSONAL DATA PROCESSED?
          </h3>
          <p className="mb-4">
            We collect and process personal data that are relevant, adequate, not excessive and
            strictly necessary for the purposes pursued.
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-5">
            <li>
              <p className="mb-1 font-semibold">Event Registration &amp; Access Management</p>
              <p className="mb-2">
                Process your registration for events, verify your identity, and manage access to
                itinerary venues.
              </p>
              <p className="mb-2">
                Legal basis: Performance of a contract (Terms &amp; Conditions).
              </p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Personalized Itinerary Services</p>
              <p className="mb-2">
                Create and manage your personalized event schedule based on your assigned group,
                provide activity details, and send updates.
              </p>
              <p className="mb-2">Legal basis: Performance of a contract.</p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Health &amp; Safety Management</p>
              <p className="mb-2">
                Ensure proper accommodation of dietary, medical, and accessibility requirements;
                manage emergency situations.
              </p>
              <p className="mb-2">
                Legal basis: Legal obligations and vital interests in emergencies.
              </p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Communication Services</p>
              <p className="mb-2">
                Send event notifications, activity updates, and important announcements via your
                preferred channels (email/WhatsApp).
              </p>
              <p className="mb-2">
                Legal basis: Performance of a contract for service communications; Consent for
                marketing communications.
              </p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Event Logistics</p>
              <p className="mb-2">
                Coordinate travel arrangements, accommodation bookings, transfers, and merchandise
                distribution.
              </p>
              <p className="mb-2">Legal basis: Performance of a contract.</p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Customer Support</p>
              <p className="mb-2">
                Handle inquiries, feedback, and requests related to your event participation.
              </p>
              <p className="mb-2">Legal basis: Legitimate interest to provide quality support.</p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Platform Security</p>
              <p className="mb-2">
                Maintain safety and security of the Platform, prevent fraudulent access, manage
                magic link authentication.
              </p>
              <p className="mb-2">Legal basis: Legitimate interest to provide secure services.</p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Analytics &amp; Improvement</p>
              <p className="mb-2">
                Analyze Platform usage, improve user experience, and optimize event operations.
              </p>
              <p className="mb-2">Legal basis: Legitimate interest to improve services.</p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Legal Compliance</p>
              <p className="mb-2">
                Respond to legal requests, defend our rights, and manage disputes.
              </p>
              <p className="mb-2">
                Legal basis: Legal obligations and legitimate interest to protect our rights.
              </p>
            </li>
            <li>
              <p className="mb-1 font-semibold">Group Management</p>
              <p className="mb-2">
                Assign attendees to appropriate groups based on guest type and requirements.
              </p>
              <p className="mb-2">Legal basis: Performance of a contract.</p>
            </li>
          </ul>

          <h3 className="mt-6 mb-2 font-semibold">
            4. TO WHOM DO WE DISCLOSE YOUR PERSONAL DATA AND WHY?
          </h3>
          <p className="mb-2 font-semibold">To Internal Authorised Employees</p>
          <p className="mb-4">
            We will communicate your data to our employees who need to process your personal data
            for the purposes specified in Section 3 of this Privacy Policy, in particular to our
            event operations, customer support, accounting and technical teams. Your personal data
            can also be processed by employees from Chivas Brothers International Limited&apos;s
            affiliates where they provide support services (IT, administrative, operational support)
            as processor of Chivas Brothers International Limited.
          </p>
          <p className="mb-2 font-semibold">To Service Providers</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">
                For event management and communication purposes:
              </span>
              &nbsp;We will share your data with our event service providers including venue
              partners, hospitality providers, transport companies, and communication agencies to
              help us deliver event experiences, manage registrations, coordinate logistics, as well
              as send event-related communications and analyze event effectiveness.
            </li>
            <li>
              <span className="font-semibold">For IT support purposes:</span>&nbsp;We will share
              your data with our IT support service providers (for hosting, maintenance and
              technical support services) to help us for the internal operations of our Platform and
              to assist us with administering the various features, programs and services available
              on it.
            </li>
            <li>
              <span className="font-semibold">For communication delivery:</span>&nbsp;We will share
              your data with our messaging service providers solely to deliver event notifications
              and updates according to your preferences.
            </li>
          </ul>
          <p className="mb-2 font-semibold">To Partners</p>
          <p className="mb-4">
            For event programs: When we operate events on behalf of or in partnership with event
            organizers, corporate clients, or other reputable third parties, we may share your
            personal data with our partner or event organizer. Your personal data shared with event
            organizers is necessary for the delivery of the event experience you registered for. We
            will inform you at the time of registration which organization is hosting the event.
          </p>
          <p className="mb-2 font-semibold">To Other Third Parties</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">For litigation and safety purposes:</span>&nbsp;We may
              also disclose your personal data to authorities and/or external counsels if we are
              required to do so by law, or if in our good faith judgment, such action is reasonably
              necessary to comply with legal processes, to respond to any claims, or to protect the
              security or rights of Chivas Brothers International Limited, event participants, or
              the public.
            </li>
            <li>
              <span className="font-semibold">In the event of a merger or acquisition:</span>
              &nbsp;If Chivas Brothers International Limited or part of our business is acquired by
              another company, or in the event that we were to sell or dispose of all or a part of
              our business, the acquirer may have access to the information maintained by that
              business, which could include personal data, subject to applicable law. Similarly,
              personal data may be transferred as part of a corporate reorganization, insolvency
              proceeding, or other similar event, if permitted by and done in accordance with
              applicable law. If applicable, the acquirer who will act as the new data controller
              will process your personal data in the conditions provided in the acquirer&apos;s
              privacy policy.
            </li>
          </ul>

          <h3 className="mt-6 mb-2 font-semibold">
            5. IS YOUR DATA SENT TO RECIPIENTS OUTSIDE THE UK OR EUROPEAN UNION?
          </h3>
          <p className="mb-4">
            Chivas Brothers International Limited operates globally to support international events,
            and your personal data may be transferred to countries outside the United Kingdom, the
            European Economic Area, and the European Union, where our affiliates and third parties
            operate. Such transfers will only take place if permitted and in compliance with
            applicable laws.
          </p>
          <p className="mb-4">
            For these transfers, Chivas Brothers International Limited takes appropriate measures to
            ensure the security of personal data both during transit and at the receiving location.
            We ensure that either: The country to which the data is transferred has been deemed to
            provide an adequate level of protection by the relevant regulatory authority (such as
            the European Commission for EU data or the UK government for UK data); or Appropriate
            safeguards are in place, such as the Standard Contractual Clauses approved by the
            European Commission or the International Data Transfer Agreement (IDTA) or Addendum
            approved by the UK government, or where applicable, Binding Corporate Rules.
          </p>
          <p className="mb-4">
            You may obtain a copy of these safeguards at any time by contacting Chivas Brothers
            International Limited at the email address specified in section 10 of this Privacy
            Policy.
          </p>
          <p className="mb-2">
            Our main service providers for the operation of our Platform are based in the United
            States. The transfers of personal data to these service providers are implemented in
            accordance with applicable laws and rely on standard contractual clauses as set out by
            the European Commission. Such service providers are also bound by a contract that
            ensures a high standard of privacy protection and requires (amongst other provisions)
            that they act only on Chivas Brothers International Limited&apos;s instructions and
            implement technical measures necessary on an ongoing basis to keep your Personal Data
            secure.
          </p>
          <p className="mb-2">For these transfers, we ensure appropriate safeguards:</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>Standard Contractual Clauses approved by relevant authorities</li>
            <li>Adequacy decisions where applicable</li>
            <li>Technical and organizational security measures</li>
          </ul>
          <p className="mb-4">
            You may request information about these safeguards by contacting us at the address in
            Section 10.
          </p>

          <h3 className="mt-6 mb-2 font-semibold">6. HOW LONG DO WE KEEP YOUR PERSONAL DATA?</h3>
          <p className="mb-2">
            We retain your personal data for different periods depending on the purpose:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">
                Event registration, Itinerary and activity data:
              </span>
              &nbsp;Duration of the event + 1 month, or when you request deletion
            </li>
            <li>
              <span className="font-semibold">Communication preferences:</span>&nbsp;Duration of the
              event + 1 month, or when you unsubscribe or request deletion
            </li>
            <li>
              <span className="font-semibold">Emergency contact information:</span>&nbsp;Duration of
              the event only
            </li>
            <li>
              <span className="font-semibold">Health/dietary/accessibility requirements:</span>
              &nbsp;Duration of the event + 1 month
            </li>
            <li>
              <span className="font-semibold">Technical logs:</span>&nbsp;1 year
            </li>
          </ul>

          <h3 className="mt-6 mb-2 font-semibold">7. HOW DO WE SECURE YOUR PERSONAL DATA?</h3>
          <p className="mb-4">
            Pernod Ricard takes all necessary technical and organizational measures to protect the
            confidentiality and security of your personal data collected via our Digital Media.
            These efforts include but are not necessarily limited to: (i) storing your personal data
            in secure operating environments to which the public does not have access, but only
            authorized Pernod Ricard employees, and our agents and contractors; and, (ii) verifying
            the identities of registered users before they can access the personal data we maintain
            about them.
          </p>
          <p className="mb-4">
            Our Digital Media may link up users to other websites of third parties and/or affiliates
            or subsidiaries of Pernod Ricard, through hyperlinks; this is a service available to you
            as a user of the site. Such links do not constitute an endorsement by Pernod Ricard of
            the linked sites, their content, including products, advertising or any other materials
            featured on them. Pernod Ricard has no control over these linked sites and cannot be
            held responsible or liable for their content, including products, advertising or any
            other materials featured on them, or any purchase you may choose to make on these linked
            sites.
          </p>

          <h3 className="mt-6 mb-2 font-semibold">
            8. WHAT ARE YOUR RIGHTS REGARDING YOUR PERSONAL DATA?
          </h3>
          <p className="mb-2">You have the following rights:</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">Access:</span>&nbsp;Obtain a copy of your personal
              data we hold
            </li>
            <li>
              <span className="font-semibold">Rectification:</span>&nbsp;Correct inaccurate or
              incomplete data
            </li>
            <li>
              <span className="font-semibold">Erasure:</span>&nbsp;Request deletion of your data
              (subject to legal obligations)
            </li>
            <li>
              <span className="font-semibold">Restriction:</span>&nbsp;Limit processing in specific
              circumstances
            </li>
            <li>
              <span className="font-semibold">Data Portability:</span>&nbsp;Receive your data in a
              machine-readable format
            </li>
            <li>
              <span className="font-semibold">Object:</span>&nbsp;Object to processing based on
              legitimate interests or for direct marketing
            </li>
            <li>
              <span className="font-semibold">Withdraw Consent:</span>&nbsp;Where processing is
              based on consent, withdraw it at any time
            </li>
          </ul>
          <p className="mb-4">
            To exercise these rights, contact us at: ukconsumerfeedback@pernod-ricard.com
          </p>
          <p className="mb-2">You may also lodge a complaint with the supervisory authority:</p>
          <ul className="mb-4 list-disc space-y-1 pl-5">
            <li>UK: Information Commissioner&apos;s Office (www.ico.org.uk)</li>
            <li>Your local data protection authority if outside the UK</li>
          </ul>

          <h3 className="mt-6 mb-2 font-semibold">9. HOW CAN YOU CONTACT US?</h3>
          <p className="mb-4">
            If you have any questions, complaints, or comments regarding this Privacy Policy or our
            information collection practices, please contact us by writing to: Chivas Brothers
            International Limited, Data Privacy Champion, Pernod Ricard Middle East, DIFC Branch,
            ICD Brookfield Place, Dubai International Financial Centre (DIFC), United Arab Emirates.
          </p>
          <p className="mb-4">Or by sending an email to: ukconsumerfeedback@pernod-ricard.com.</p>
          <p className="mb-4">
            Pernod Ricard also has a appointed a Global Data Protection Officer that you can reach
            at group.dpo@pernod-ricard.com.
          </p>
        </div>
      </div>
    </FooterContentLayout>
  );
}
