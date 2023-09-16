// UpdatesSection.tsx

import React from "react";

const UpdatesSection: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-3xl font-display mb-4">Updates</h3>
            <p className="text-xl font-roboto">Stay tuned for updates and milestones in our mission to save the Elkader Keystone Bridge.</p>
            {/* This is a placeholder for the list of updates. */}
            <ul className="mt-4 text-left">
                <li>Update 1...</li>
                <li>Update 2...</li>
                <li>Update 3...</li>
            </ul>
        </section>
    );
};

export default UpdatesSection;
