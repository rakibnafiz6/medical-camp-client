
const HealthTips = () => {
    return (
        <div className="pl-7 space-y-3">
            <h2 className="font-bold text-2xl text-center">Health Tips Section</h2>
            <h4 className="font-bold text-xl">Purpose:</h4>
            Provide participants and organizers with useful health tips to improve their well-being and raise awareness about common health issues.

            <h4 className="text-base font-bold">Features:</h4>

            <h4 className="text-base font-bold ml-2">1. Daily Health Tip:</h4>
            <li className="ml-6"> Display a random health tip each day (e.g., "Drink at least 8 glasses of water daily to stay hydrated.").</li>
           
            <h4 className="text-base font-bold ml-2">2. Categories of Health Tips:</h4>
            <li className="ml-6">Divide tips into categories like Nutrition, Fitness, Mental Health, and First Aid.</li>
            
            <h4 className="text-base font-bold ml-2">3. Interactive Quiz:</h4>
            <li className="ml-6">Add a small interactive quiz or trivia to engage users in learning health facts.</li>
            
            <h4 className="text-base font-bold ml-2">4. Health Blog Links:</h4>

            <li className="ml-6">Include links to blogs or resources for more detailed health information.</li>
        </div>
    );
};

export default HealthTips;