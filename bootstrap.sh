#!/bin/bash

mkdir -p components

declare -a components=("DonationModal" "ExitIntentModal" "Header" "HeroSection" "AboutSection" 
"ProgressSection" "DonationSection" "VolunteerSection" "TestimonialSection" "UpdatesSection" "ContactSection")

for component in "${components[@]}"; do
    echo "import React from 'react';

export const ${component}: React.FC = () => {
    return (
        <div className='p-4'>
            <h2>${component}</h2>
        </div>
    );
};

export default ${component};" > components/${component}.tsx
done

echo "Components have been created."