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
        calories: 500,
        country_style: 'America',
        image: '/imgs/food.jpg',
        topmeal: false
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
        calories: 200,
        country_style: 'Canada',
        image: '/imgs/lasagna.jpg',
        topmeal: true
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
        calories: 400,
        country_style: 'Thai',
        image: '/imgs/pineappleRice.jpg',
        topmeal: false
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
        calories: 1000,
        country_style: 'Japan',
        image: '/imgs/box2.jpeg',
        topmeal: false
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
        calories: 2000,
        image: '/imgs/partyTrayA.jpg',
        country_style: 'Japan',
        topmeal: false
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
        calories: 3000,
        country_style: 'Japan',
        image: '/imgs/partyTrayB.jpg',
        topmeal: true
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
        calories: 3000,
        country_style: 'Canada',
        image: '/imgs/box3.jpeg',
        topmeal: false
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
        calories: 3000,
        country_style: 'Canada',
        image: '/imgs/cheese.jpg',
        topmeal: true
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
        calories: 1200,
        country_style: 'Korea',
        image: '/imgs/box4.jpg',
        topmeal: false
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
        calories: 1000,
        country_style: 'Korean',
        image: '/imgs/bulgogi.jpg',
        topmeal: true
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
        calories: 7000,
        country_style: 'Korean',
        image: '/imgs/kimbob.jpg',
        topmeal: false
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
        calories: 300,
        country_style: 'Korean',
        image: '/imgs/koreanNoodle.jpg',
        topmeal: false
    },
]

const categories = []
for (let meal of data) {
    if (!categories.includes(meal.category)){
        categories.push(meal.category)
    }

}

const menus = []
for (let i = 0; i < categories.length; i++) {
    menus.push({
        group: categories[i],
        meals: []
    })
    for (let j = 0; j < data.length; j++){
        if(data[j].category === categories[i]){
            menus[i].meals.push(data[j])
        }
    }
}

console.log(menus)
