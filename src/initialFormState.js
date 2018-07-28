export const initialFormState = {
    // firstName: {
    //     label: "First Name",
    //     value: "",
    //     type: "text"
    // },
    // lastName: {
    //     label: "Last Name",
    //     value: "",
    //     type: "text"
    // },
    email: {
        label: "Email",
        value: "",
        type: "text"
    },
    password: {
        label: "Choose app password",
        value: "",
        type: "password"
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
    ethnicityCode: {
        label: "Primary Ethnicity",
        type: "radio",
        values: [
            {label: "White/Caucassian", selected: false, code: "WHITE"},
            {label: "Black", selected: false, code: "BLACK"},
            {label: "Hispanic/Latino", selected: false, code: "LAT"},
            {label: "American Indian", selected: false, code: "NATIVE"},
            {label: "Other", selected: false, code: "OTHER"},
        ],
    },
    dateOfBirth: {
        label: "Date of Birth (mm-dd-yyyy)",
        value: "",
        type: "text"
    },
    phoneNumber: {
        label: "Phone Number",
        value: "",
        type: "text"
    },
    lastCheckUp: {
        label: "Approx date of last checkup",
        submissionKey: "healthBehavior",
        value: "",
        type: "text"
    },
    height: {
        label: "Height",
        submissionKey: "healthBehavior",
        value: "",
        type: "text"
    },
    weight: {
        label: "Weight (lbs)",
        submissionKey: "healthBehavior",
        value: "",
        type: "number"
    },
    A1CLevels: {
        label: "A1C Levels",
        submissionKey: "healthBehavior",
        value: "",
        type: "text"
    },
    medicalHistory: {
        label: "History of Medical Conditions",
        type: "checkbox",
        secondaryType: "object",
        submissionKey: "healthBehavior",
        values:[
            {label: "Heart Condition", selected: false, key: "heartConditions"},
            {label: "Hypertension", selected: false, key: "hypertension"},
            {label: "Respiratory Illness", selected: false, key: "respiratoryIllness"},
            {label: "Physical Injuries", selected: false, key: "physicalInjuries"}
        ]
    },
    days: {
        label: "Days on which you typically exercise:",
        type: "checkbox",
        submissionKey: "healthBehavior.exercisePatterns",
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
    types: {
        label: "What are your preferred types of exercise?",
        type: "checkbox",
        submissionKey: "healthBehavior.exercisePatterns",
        values: [
            {code: "CARDIO", label: "Cardiovascular", selected: false},
            {code: "WEIGHT", label: "Weight Lifting", selected: false},
            {code: "SPORT", label: "General Sports", selected: false},
            {code: "JOGGING", label: "Running or Jogging", selected: false}
        ],
    },
    level: {
        label: "At which intensity do you usually exercise?",
        type: "radio",
        submissionKey: "healthBehavior.exercisePatterns",
        values: [
            {label: "Low", selected: false},
            {label: "Moderate (Fat Burn)", selected: false},
            {label: "High (Cardio)", selected: false},
        ]
    },
    hoursPerDay: {
        label: "Number of hours of exercise per day",
        value: "",
        submissionKey: "healthBehavior.exercisePatterns",
        type: "text"
    },
    floorsPerDay: {
        label: "Number of floors climbed per day",
        value: "",
        submissionKey: "healthBehavior.exercisePatterns",
        type: "text"
    },
    stepsPerDay: {
        label: "Steps per day",
        value: "",
        submissionKey: "healthBehavior.exercisePatterns",
        type: "text"
    },
    adequateSleepPattern: {
        label: "Describe your sleeping patterns",
        type: "radio",
        submissionKey: "healthBehavior",
        values: [
            {label: "Adequate", selected: false, code: true},
            {label: "Inadequate", selected: false, code: false},
        ]
    },
    stressLevel: {
        label: "Rate your stress level",
        type: "radio",
        submissionKey: "healthBehavior",
        values: [
            {label: "High", selected: false},
            {label: "Medium", selected: false},
            {label: "Low", selected: false}
        ]
    },
    //DIET####################################################
    // meals: {
    //     label: "How many meals do you eat?",
    //     type: "checkbox",
    //     submissionKey: "dietBehavior",
    //     secondaryType: "meals",
    //     values: [
    //         {label: "Breakfast", selected: false},
    //         {label: "Lunch", selected: false},
    //         {label: "Dinner", selected: false}
    //     ]
    // },
    hasBreakfast:{
        label: "Do you have breakfast every day?",
        type: "radio",
        submissionKey: "dietBehavior",
        values: [
            {label: "Yes", selected: false, code: true},
            {label: "No", selected: false, code: false}
        ]
    },
    hasLunch: {
        label: "Do you have lunch every day?",
        type: "radio",
        submissionKey: "dietBehavior",
        values: [
            {label: "Yes", selected: false, code: true},
            {label: "No", selected: false, code: false}
        ]
    },
    hasDinner: {
        label: "Do you have dinner every day?",
        type: "radio",
        submissionKey: "dietBehavior",
        values: [
            {label: "Yes", selected: false, code: true},
            {label: "No", selected: false, code: false}
        ]
    },
    snacksPerDay: {
        label: "How many times do you snack per day?",
        submissionKey: "dietBehavior",
        value: "",
        type: "number"
    },
    snackPreference: {
        label: "Which snacks do you prefer?",
        submissionKey: "dietBehavior",
        type: "checkbox",
        values: [
            {label: "Sweet", selected: false, code: "SWEET"},
            {label: "Savory", selected: false, code: "SAVORY"},
            {label: "Fruits", selected: false, code: "FRUIT"},
            {label: "Nuts", selected: false, code: "NUTS"}
        ]
    },
    waterPerDay: {
        label: "Number of cups of water you drink per day",
        submissionKey: "dietBehavior",
        value: "",
        type: "number"
    },
    alcoholConsumedOn: {
        label: "How many times a week do you drink alcohol?",
        submissionKey: "dietBehavior",
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
    drinksPerDay: {
        label: "How many drinks do you have each time?",
        submissionKey: "dietBehavior",
        type: "radio",
        values: [
            {label: "n/a", selected: false, code: 0},
            {label: "1", selected: false, code: 1},
            {label: "2", selected: false, code: 2},
            {label: "3", selected: false, code: 3},
            {label: "4", selected: false, code: 4},
            {label: "5+", selected: false, code: 5},
        ]
    },
    //MISSING FROM API CALL
    // preferredSnackTime: {
    //     label: "Preferred Snack Time",
    //     type: "checkbox",
    //     values: [
    //         {label: "Early Morning", selected: false},
    //         {label: "Between Meals", selected: false},
    //         {label: "Evening", selected: false},
    //         {label: "Late Night", selected: false},
    //     ]
    // },
    beveragePreferences: {
        label: "Non-alcoholic beverages you consume",
        submissionKey: "dietBehavior",
        type: "checkbox",
        values: [
            {label: "Coffee", selected: false},
            {label: "Tea", selected: false},
            {label: "Soda", selected: false},
            {label: "Juice", selected: false},
            {label: "Energy Drinks", selected: false, code: 'ENERGY'},
        ]
    },
    timeForBeverages: {
        label: "When do you usually drink beverages?",
        submissionKey: "dietBehavior",
        type: "checkbox",
        values: [
            {label: "Early Morning", selected: false, code: "EARLY_MORNING"},
            {label: "Between Meals", selected: false, code: "BETWEEN_MEALS"},
            {label: "Evening", selected: false, code: "EVENING"},
            {label: "Late Night", selected: false, code: "LATE_NIGHT"},
        ]
    },
    restriction: {
        label: "Dietary restrictions",
        submissionKey: "dietBehavior",
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
        submissionKey: "dietBehavior.dietPatterns.foodTypeLevels",
        type: "multicheckbox",
        values: [
            {label: "High Glycemic (Pizza, Pasta, White Bread)", selected: "NONE", code: "HIGH_GLYC"},
            {label: "Whole Grains", selected: "NONE", code: "GRAINS"},
            {label: "Legumes and beans", selected: "NONE", code: "BEANS"},
        ],
        choices: ["NONE", "LOW", "MEDIUM", "HIGH"]
    },
    proteinPatterns: {
        label: "Diet patterns - Proteins",
        submissionKey: "dietBehavior.dietPatterns.foodTypeLevels",
        type: "multicheckbox",
        values: [
            {label: "Lean Poultry", selected: "NONE", code: "LPOULTRY"},
            {label: "Poultry", selected: "NONE", code: "POULTRY"},
            {label: "Lean Meat", selected: "NONE", code: "LMEAT"},
            {label: "Meat", selected: "NONE", code: "MEAT"},
            {label: "Fish and Seafood", selected: "NONE", code: "FISH"},
            {label: "Tofu, Legumes, and over Vegetable proteins", selected: "NONE", code: "PPLANT"},
        ],
        choices: ["NONE", "LOW", "MEDIUM", "HIGH"]
    },
    fatPatterns: {
        label: "Diet patterns - Fat",
        submissionKey: "dietBehavior.dietPatterns.foodTypeLevels",
        type: "multicheckbox",
        values: [
            {label: "Olive Oil", selected: "NONE", code: "OOIL"},
            {label: "Vegetable Oils", selected: "NONE", code: "VOIL"},
            {label: "Butter", selected: "NONE", code: "BUTTER"},
            {label: "Other", selected: "NONE", code: "OTHERF"},
        ],
        choices: ["NONE", "LOW", "MEDIUM", "HIGH"]
    },
    sugarPatterns: {
        label: "Diet patterns - Sugar",
        submissionKey: "dietBehavior.dietPatterns.foodTypeLevels",
        type: "multicheckbox",
        values: [
            {label: 'Desserts', selected: "NONE", code: "DESSERT"},
            {label: 'Snacks', selected: "NONE", code: "SNACK"},
            {label: 'Sugary Drinks', selected: "NONE", code: "BEVERAGE"},
        ],
        choices: ["NONE", "LOW", "MEDIUM", "HIGH"]
    },
    vegetablesPreference: {
        label: "Diet patterns - Vegetables",
        submissionKey: "dietBehavior.dietPatterns",
        type: "radio",
        values: [
            {label: "Love", selected: false},
            {label: "Like", selected: false},
            {label: "Dislike", selected: false},
        ]
    },
    fruitsPreference: {
        label: "Diet Patterns - Fruit",
        submissionKey: "dietBehavior.dietPatterns",
        type: "radio",
        values: [
            {label: "Love", selected: false},
            {label: "Like", selected: false},
            {label: "Dislike", selected: false},
        ]
    },
    // GOALS #################################################
    // currentWeight: {
    //     label: "Current Weight (lbs)",
    //     value: "",
    //     type: "text"
    // },
    // targetWeight: {
    //     label: "Target Weight (lbs)",
    //     value: "",
    //     type: "text"
    // },
    // currentExerciseLevel: {
    //     label: "Current Exercise Level",
    //     value: "",
    //     type: "text"
    // },
    // exerciseGoals: {
    //     label: "Exercise Goals",
    //     value: "",
    //     type: "text"
    // },
    // dietGoals: {
    //     label: "Diet Goals",
    //     value: "",
    //     type: "text"
    // },
    // mentalHealthGoals: {
    //     label: "Mental Health Goals",
    //     value: "",
    //     type: "text"
    // }
};