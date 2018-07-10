export const initialFormState = {
    firstName: {
        label: "First Name",
        value: ""
    },
    lastName: {
        label: "Last Name",
        value: ""
    },
    height: {
        label: "Height",
        value: ""
    },
    weight: {
        label: "Weight (lbs)",
        value: ""
    },
    gender: {
        label: "Gender",
        value: [
            {label: "Male", selected: false},
            {label: "Female", selected: false},
            {label: "Not Specified", selected: false},
        ],
    },
    ethnicity: {
        label: "Primary Ethnicity",
        value: [
            {label: "White/Caucassian", selected: false},
            {label: "Black", selected: false},
            {label: "Hispanic/Latino", selected: false},
            {label: "American Indian", selected: false},
            {label: "Other", selected: false},
        ],
    },
    age: {
        label: "Age",
        value: ""
    },
    fitbitEmail: {
        label: "Fitbit Email",
        value: ""
    },
    lastCheckUp: {
        label: "Months since last medical checkup",
        value: ""
    },
    A1CLevels: {
        label: "A1C Levels",
        value: ""
    },
    medicalHistory: {
        label: "History of Medical Conditions",
        value: {
            heart_condition: false,
            hypertension: false,
            respiratory_illness: false,
            physical_injuries: false,
        }
    },
    daysForExercise: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    },
    floorsPerDay: {
        label: "Number of floors climbed per day",
        value: ""
    },
    daysOfExercisePerWeek: {
        label: "Number of Days per week you exercise",
        value: ""
    },
    hoursOfExercisePerWeek: {
        label: "Number of hours of exercise per week",
        value: ""
    },
    stepsPerDay: {
        label: "Steps per day",
        value: ""
    },
    exerciseIntensity: [
        {label: "Low", selected: false},
        {label: "Moderate (Fat Burn)", selected: false},
        {label: "High (Cardio)", selected: false},
    ],
    typesOfExercise: [
        {label: "Walking", selected: false},
        {label: "Running", selected: false},
        {label: "Other Cardio", selected: false},
    ],
    sleepPatterns: [
        {label: "Adequate", selected: false},
        {label: "Inadequate", selected: false},
    ],
    stress: [
        {label: "High", selected: false},
        {label: "Medium", selected: false},
        {label: "Low", selected: false}
    ],
    //DIET####################################################
    meals: {
        label: "How many meals do you eat?",
        value: {
            breakfast: false,
            lunch: false,
            dinner: false
        }
    },
    snacksPerDay: {
        label: "How many times do you snack per day?",
        value: ""
    },
    snackPreference: {
        label: "Which snacks do you prefer?",
        value: {
            sweet: false,
            savory: false,
            fruits: false,
            nuts: false
        }
    },
    preferredSnackTime: {
        label: "Preferred Snack Time",
        value: {
            early_morning: false,
            between_meals: false,
            evening: false,
            late_night: false
        }
    },
    alcoholConsumption: {
        label: "How many times a week do you drink alcohol?",
        value: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    },
    drinksPerSession: {
        label: "How many drinks do you have each time?",
        value: [
            {label: "1-2", selected: false},
            {label: "3-4", selected: false},
            {label: "More than 4", selected: false},
        ]
    },
    waterPerDay: {
        label: "Number of cups of water you drink per day",
        value: ""
    },
    nonAlcoholicBeverages: {
        label: "Non-alcoholic beverages you consume",
        value: {
            tea_and_coffee: false,
            soda_and_juice: false,
            energy_drinks: false
        }
    },
    preferredTimeForBeverages: {
        label: "When do you usually drink beverages?",
        value: {
            early_morning: false,
            between_meals: false,
            evening: false,
            late_night: false
        }
    },
    dietaryRestrictions: {
        label: "Dietary restrictions",
        value: {
            kosher: false,
            halal: false,
            vegetarian: false,
            vegan: false
        }
    },
    carbPatterns: {
        label: "Dietary patterns - Carbohydrates",
        value: {
            high_glycemic_simple_carbs: false,
            whole_grains: false,
            legumes_and_beans: false,
        }
    },
    proteinPatterns: {
        label: "Diet patterns - Proteins",
        value: {
            lean_poultry: false,
            poultry: false,
            lean_meat: false,
            meat: false,
            seafood: false,
            legumes_and_other_vegetable_based_protein: false,
        }
    },
    fatPatterns: {
        label: "Diet patterns - Fat",
        value: {
            olive_oil: false,
            vegetable_oil: false,
            butter: false,
            other: false
        }
    },
    sugarPatterns: {
        label: "Diet patterns - Sugar",
        value: {
            desserts: false,
            snacks: false,
            sugary_drinks: false
        }
    },
    vegetablePreference: {
        label: "Diet patterns - Vegetables",
        value: [
            {label: "Love", selected: false},
            {label: "Like", selected: false},
            {label: "Dislike", selected: false},
        ]
    },
    fruitPreference: {
        label: "Diet Patterns - Fruit",
        value: [
            {label: "Love", selected: false},
            {label: "Like", selected: false},
            {label: "Dislike", selected: false},
        ]
    },
    // GOALS #################################################
    currentWeight: {
        label: "Current Weight (lbs)",
        value: ""
    },
    targetWeight: {
        label: "Target Weight (lbs)",
        value: ""
    },
    currentExerciseLevel: {
        label: "Current Exercise Level",
        value: ""
    },
    exerciseGoals: {
        label: "Exercise Goals",
        value: ""
    },
    dietGoals: {
        label: "Diet Goals",
        value: ""
    },
    mentalHealthGoals: {
        label: "Mental Health Goals",
        value: ""
    }
}