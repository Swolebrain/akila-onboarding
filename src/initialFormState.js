export const initialFormState = {
    firstName: {
        label: "First Name",
        value: "",
        type: "text"
    },
    lastName: {
        label: "Last Name",
        value: "",
        type: "text"
    },
    height: {
        label: "Height",
        value: "",
        type: "text"
    },
    weight: {
        label: "Weight (lbs)",
        value: "",
        type: "number"
    },
    gender: {
        label: "Gender",
        type: "radio",
        values: [
            {label: "Male", selected: false},
            {label: "Female", selected: false},
            {label: "Not Specified", selected: false},
        ],
    },
    ethnicity: {
        label: "Primary Ethnicity",
        type: "radio",
        values: [
            {label: "White/Caucassian", selected: false},
            {label: "Black", selected: false},
            {label: "Hispanic/Latino", selected: false},
            {label: "American Indian", selected: false},
            {label: "Other", selected: false},
        ],
    },
    age: {
        label: "Age",
        value: "",
        type: "text"
    },
    email: {
        label: "Email",
        value: "",
        type: "email"
    },
    lastCheckUp: {
        label: "Months since last medical checkup",
        value: "",
        type: "text"
    },
    A1CLevels: {
        label: "A1C Levels",
        value: "",
        type: "text"
    },
    medicalHistory: {
        label: "History of Medical Conditions",
        type: "checkbox",
        values:[
            {label: "Heart Condition", selected: false},
            {label: "Hypertension", selected: false},
            {label: "Respiratory Illness", selected: false},
            {label: "Physical Injuries", selected: false}
        ]
    },
    daysForExercise: {
        label: "Days on which you typically exercise:",
        type: "checkbox",
        values: [
            {label: "Monday", selected: false},
            {label: "Tuesday", selected: false},
            {label: "Wednesday", selected: false},
            {label: "Thursday", selected: false},
            {label: "Friday", selected: false},
            {label: "Saturday", selected: false},
            {label: "Sunday", selected: false},
        ]
    },
    floorsPerDay: {
        label: "Number of floors climbed per day",
        value: "",
        type: "text"
    },
    daysOfExercisePerWeek: {
        label: "Number of Days per week you exercise",
        value: "",
        type: "text"
    },
    hoursOfExercisePerWeek: {
        label: "Number of hours of exercise per week",
        value: "",
        type: "text"
    },
    stepsPerDay: {
        label: "Steps per day",
        value: "",
        type: "text"
    },
    exerciseIntensity: {
        label: "At which intensity do you usually exercise?",
        type: "radio",
        values: [
            {label: "Low", selected: false},
            {label: "Moderate (Fat Burn)", selected: false},
            {label: "High (Cardio)", selected: false},
        ]
    },
    typesOfExercise: {
        label: "What are your preferred types of exercise?",
        type: "checkbox",
        values: [
            {label: "Walking", selected: false},
            {label: "Running", selected: false},
            {label: "Other Cardio", selected: false},
        ]
    },
    sleepPatterns: {
        label: "Describe your sleeping patterns",
        type: "radio",
        values: [
            {label: "Adequate", selected: false},
            {label: "Inadequate", selected: false},
        ]
    },
    stress: {
        label: "Rate your stress level",
        type: "radio",
        values: [
            {label: "High", selected: false},
            {label: "Medium", selected: false},
            {label: "Low", selected: false}
        ]
    },
    //DIET####################################################
    meals: {
        label: "How many meals do you eat?",
        type: "checkbox",
        values: [
            {label: "Breakfast", selected: false},
            {label: "Lunch", selected: false},
            {label: "Dinner", selected: false}
        ]
    },
    snacksPerDay: {
        label: "How many times do you snack per day?",
        value: "",
        type: "number"
    },
    snackPreference: {
        label: "Which snacks do you prefer?",
        type: "checkbox",
        values: [
            {label: "Sweet", selected: false},
            {label: "Savory", selected: false},
            {label: "Fruits", selected: false},
            {label: "Nuts", selected: false}
        ]
    },
    preferredSnackTime: {
        label: "Preferred Snack Time",
        type: "checkbox",
        values: [
            {label: "Early Morning", selected: false},
            {label: "Between Meals", selected: false},
            {label: "Evening", selected: false},
            {label: "Late Night", selected: false},
        ]
    },
    alcoholConsumption: {
        label: "How many times a week do you drink alcohol?",
        type: "checkbox",
        values: [
            {label: "Monday", selected: false},
            {label: "Tuesday", selected: false},
            {label: "Wednesday", selected: false},
            {label: "Thursday", selected: false},
            {label: "Friday", selected: false},
            {label: "Saturday", selected: false},
            {label: "Sunday", selected: false},
        ]
    },
    drinksPerSession: {
        label: "How many drinks do you have each time?",
        type: "radio",
        values: [
            {label: "1-2", selected: false},
            {label: "3-4", selected: false},
            {label: "More than 4", selected: false},
        ]
    },
    waterPerDay: {
        label: "Number of cups of water you drink per day",
        value: "",
        type: "number"
    },
    nonAlcoholicBeverages: {
        label: "Non-alcoholic beverages you consume",
        type: "checkbox",
        values: [
            {label: "Tea or Coffee", selected: false},
            {label: "Soda or Juice", selected: false},
            {label: "Energy Drinks", selected: false},
        ]
    },
    preferredTimeForBeverages: {
        label: "When do you usually drink beverages?",
        type: "checkbox",
        values: [
            {label: "Early Morning", selected: false},
            {label: "Between Meals", selected: false},
            {label: "Evening", selected: false},
            {label: "Late Night", selected: false},
        ]
    },
    dietaryRestrictions: {
        label: "Dietary restrictions",
        type: "checkbox",
        values: [
            {label: "Kosher", selected: false},
            {label: "Halal", selected: false},
            {label: "Vegetarian", selected: false},
            {label: "Vegan", selected: false},
            {label: "Gluten Free", selected: false},
        ]
    },
    carbPatterns: {
        label: "Dietary patterns - Carbohydrates",
        type: "checkbox",
        values: [
            {label: "High Glycemic Simple Carbs (pasta, white bread, etc)", selected: false},
            {label: "Whole Grains", selected: false},
            {label: "Legumes and beans", selected: false},
        ]
    },
    proteinPatterns: {
        label: "Diet patterns - Proteins",
        type: "checkbox",
        values: [
            {label: "Lean Poultry", selected: false},
            {label: "Poultry", selected: false},
            {label: "Lean Meat", selected: false},
            {label: "Meat", selected: false},
            {label: "Fish and Seafood", selected: false},
            {label: "Tofu, Legumes, and over Vegetable proteins", selected: false},
        ]
    },
    fatPatterns: {
        label: "Diet patterns - Fat",
        type: "checkbox",
        values: [
            {label: "Olive Oil", selected: false},
            {label: "Vegetable Oils", selected: false},
            {label: "Butter", selected: false},
            {label: "Other", selected: false},
        ]
    },
    sugarPatterns: {
        label: "Diet patterns - Sugar",
        type: "checkbox",
        values: [
            {label: 'Desserts', selected: false},
            {label: 'Snacks', selected: false},
            {label: 'Sugary Drinks', selected: false},
        ]
    },
    vegetablePreference: {
        label: "Diet patterns - Vegetables",
        type: "radio",
        values: [
            {label: "Love", selected: false},
            {label: "Like", selected: false},
            {label: "Dislike", selected: false},
        ]
    },
    fruitPreference: {
        label: "Diet Patterns - Fruit",
        type: "radio",
        values: [
            {label: "Love", selected: false},
            {label: "Like", selected: false},
            {label: "Dislike", selected: false},
        ]
    },
    // GOALS #################################################
    currentWeight: {
        label: "Current Weight (lbs)",
        value: "",
        type: "text"
    },
    targetWeight: {
        label: "Target Weight (lbs)",
        value: "",
        type: "text"
    },
    currentExerciseLevel: {
        label: "Current Exercise Level",
        value: "",
        type: "text"
    },
    exerciseGoals: {
        label: "Exercise Goals",
        value: "",
        type: "text"
    },
    dietGoals: {
        label: "Diet Goals",
        value: "",
        type: "text"
    },
    mentalHealthGoals: {
        label: "Mental Health Goals",
        value: "",
        type: "text"
    }
}