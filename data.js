const data = [
    {
        title: 'Vegetarian Lunch Box',
        included: [
            'Sprouted bread',
            'Chickpea Spinach Salad',
            'Veggie Wrap',
            'Coffee'
            
        ],
        description: 'Green',
        category: 'Lunch Box',
        price: 9.99,
        cookingTime: 5,
        serving: 2,
        caloriesPerServing: 500,
        countryStyle: 'America',
        imageUrl: '/imgs/food.jpg',
        topMeal: false
    },

    {
        title: 'Vegetable Lasagna',
        included: [
            'Spinish artichoke lasagna',
            'Bread',
            'Drink'
            
        ],
        description: 'Healthy',
        category: 'Single',
        price: 4.99,
        cookingTime: 5,
        serving: 1,
        caloriesPerServing: 200,
        countryStyle: 'Canada',
        imageUrl: '/imgs/lasagna.jpg',
        topMeal: true
    },

    {
        title: 'Thai Pineapple Fried Rice',
        included: [
            'Fried rice',
            'Soup',
            'Apple',
            'Drink'
            
        ],
        description: 'Healthy',
        category: 'Single',
        price: 7.99,
        cookingTime: 3,
        serving: 1,
        caloriesPerServing: 400,
        countryStyle: 'Thai',
        imageUrl: '/imgs/pineappleRice.jpg',
        topMeal: false
    },

    {
        title: 'Japnese style Lunch Box',
        included: [
            '8pcs sushi',
            '8pcs maki',
            '4pcs California roll',
            'Miso soup',
            'Coffee'
            
        ],
        description: 'Yummy',
        category: 'Lunch Box',
        price: 9.99,
        cookingTime: 15,
        serving: 2,
        caloriesPerServing: 1000,
        countryStyle: 'Japan',
        imageUrl: '/imgs/box2.jpeg',
        topMeal: false
    },

    {
        title: 'Family Party Tray A',
        included: [
            '20pcs sushi',
            '8pcs maki',
            '10pcs California roll',
            'Miso soup',
            'Coffee'
            
        ],
        description: 'Healthy',
        category: 'Family',
        price: 19.99,
        cookingTime: 25,
        serving: 2,
        caloriesPerServing: 2000,
        imageUrl: '/imgs/partyTrayA.jpg',
        countryStyle: 'Japan',
        topMeal: false
    },

    {
        title: 'Family Party Tray B',
        included: [
            '30pcs sushi',
            '20pcs maki',
            '15pcs California roll',
            'Miso soup',
            'Coffee'
            
        ],
        description: 'Healthy',
        category: 'Family',
        price: 29.99,
        cookingTime: 30,
        serving: 2,
        caloriesPerServing: 3000,
        countryStyle: 'Japan',
        imageUrl: '/imgs/partyTrayB.jpg',
        topMeal: true
    },

    {
        title: 'Heavy Lunch Box',
        included: [
            'Maple smoked bacon',
            'Cheese',
            'Panko crusted onion rings',
            'Chipoltle mayo',
            'Fries',
            'Drink'
            
        ],
        description: 'Crazy',
        category: 'Lunch Box',
        price: 9.99,
        cookingTime: 6,
        serving: 2,
        caloriesPerServing: 3000,
        countryStyle: 'Canada',
        imageUrl: '/imgs/box3.jpeg',
        topMeal: false
    },

    {
        title: 'Cheese Burger',
        included: [
            'smoked bacon',
            'Double Cheese',
            'Chipoltle mayo',
            'Fries',
            'Drink'
            
        ],
        description: 'Yummy',
        category: 'Single',
        price: 7.99,
        cookingTime: 6,
        serving: 2,
        caloriesPerServing: 3000,
        countryStyle: 'Canada',
        imageUrl: '/imgs/cheese.jpg',
        topMeal: true
    },

    {
        title: 'Korean Style Lunch Box',
        included: [
            'Rice',
            'Soup',
            'Side menu',
            'Drink'
            
        ],
        description: 'Healthy',
        category: 'Lunch Box',
        price: 9.99,
        cookingTime: 6,
        serving: 2,
        caloriesPerServing: 1200,
        countryStyle: 'Korea',
        imageUrl: '/imgs/box4.jpg',
        topMeal: false
    },

    {
        title: 'Bulgogi',
        included: [
            'Bulgogi',
            'Rice',
            'Soup',
            'Drink'
            
        ],
        description: 'Healthy',
        category: 'Single',
        price: 7.99,
        cookingTime: 10,
        serving: 1,
        caloriesPerServing: 1000,
        countryStyle: 'Korean',
        imageUrl: '/imgs/bulgogi.jpg',
        topMeal: true
    },

    {
        title: 'Kimbob',
        included: [
            'Rice',
            'Seaweed',
            'Veggies',
            'Beef',
            'Tuna',
            'Drink'
            
        ],
        description: 'Healthy',
        category: 'Single',
        price: 5.99,
        cookingTime: 5,
        serving: 1,
        caloriesPerServing: 7000,
        countryStyle: 'Korean',
        imageUrl: '/imgs/kimbob.jpg',
        topMeal: false
    },


    {
        title: 'Zzollmyun',
        included: [
            'noodle',
            'veggies',
            'Soup',
            'Drink'
            
        ],
        description: 'spicy',
        category: 'Single',
        price: 5.99,
        cookingTime: 3,
        serving: 1,
        caloriesPerServing: 300,
        countryStyle: 'Korean',
        imageUrl: '/imgs/koreanNoodle.jpg',
        topMeal: false
    }
    
]

module.exports = {
    getMealsByCategoryName: function(category){
   
        return data.filter(data => data.category === category);

    },

    getTopMeals: function() {
       
    return data.filter(data => data.topMeal);
    }
};