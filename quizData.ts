
import type { QuizQuestion } from './types';

// The 'id' will be added dynamically when preloading into localStorage
type QuizQuestionSeed = Omit<QuizQuestion, 'id'>;

export const ALL_QUIZZES: QuizQuestionSeed[] = [
  {
    question: "Which planet is known as the Red Planet?",
    options: [ { text: "Mars", emoji: "🪐" }, { text: "Jupiter", emoji: "☄️" }, { text: "Venus", emoji: "✨" }, { text: "Saturn", emoji: "🌍" } ],
    answer: "Mars"
  },
  {
    question: "What is the largest mammal in the world?",
    options: [ { text: "Elephant", emoji: "🐘" }, { text: "Blue Whale", emoji: "🐋" }, { text: "Giraffe", emoji: "🦒" }, { text: "Great White Shark", emoji: "🦈" } ],
    answer: "Blue Whale"
  },
  {
    question: "What do caterpillars turn into?",
    options: [ { text: "Butterflies", emoji: "🦋" }, { text: "Moths", emoji: "🐛" }, { text: "Bees", emoji: "🐝" }, { text: "Dragonflies", emoji: "🐲" } ],
    answer: "Butterflies"
  },
  {
    question: "What is the capital of Japan?",
    options: [ { text: "Beijing", emoji: "🇨🇳" }, { text: "Seoul", emoji: "🇰🇷" }, { text: "Tokyo", emoji: "🇯🇵" }, { text: "Bangkok", emoji: "🇹🇭" } ],
    answer: "Tokyo"
  },
  {
    question: "How many colors are in a rainbow?",
    options: [ { text: "5", emoji: "🌈" }, { text: "7", emoji: "🎨" }, { text: "8", emoji: "🌟" }, { text: "6", emoji: "🖍️" } ],
    answer: "7"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: [ { text: "Tiger", emoji: "🐅" }, { text: "Lion", emoji: "🦁" }, { text: "Bear", emoji: "🐻" }, { text: "Gorilla", emoji: "🦍" } ],
    answer: "Lion"
  },
  {
    question: "What is the name of the fairy in Peter Pan?",
    options: [ { text: "Tinker Bell", emoji: "🧚" }, { text: "Cinderella", emoji: "👑" }, { text: "Ariel", emoji: "🧜‍♀️" }, { text: "Elsa", emoji: "❄️" } ],
    answer: "Tinker Bell"
  },
  {
    question: "What is the fastest land animal?",
    options: [ { text: "Lion", emoji: "🦁" }, { text: "Pronghorn", emoji: "🦌" }, { text: "Cheetah", emoji: "🐆" }, { text: "Horse", emoji: "🐎" } ],
    answer: "Cheetah"
  },
  {
    question: "How many continents are there?",
    options: [ { text: "5", emoji: "🌍" }, { text: "6", emoji: "🗺️" }, { text: "7", emoji: "🌎" }, { text: "8", emoji: "🌏" } ],
    answer: "7"
  },
  {
    question: "Who wrote 'Harry Potter'?",
    options: [ { text: "J.R.R. Tolkien", emoji: "📖" }, { text: "J.K. Rowling", emoji: "✍️" }, { text: "C.S. Lewis", emoji: "📚" }, { text: "Roald Dahl", emoji: "🍫" } ],
    answer: "J.K. Rowling"
  },
  {
    question: "What is a baby goat called?",
    options: [ { text: "A kid", emoji: "🐐" }, { text: "A calf", emoji: "🐄" }, { text: "A lamb", emoji: "🐑" }, { text: "A piglet", emoji: "🐖" } ],
    answer: "A kid"
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: [ { text: "Tomato", emoji: "🍅" }, { text: "Avocado", emoji: "🥑" }, { text: "Onion", emoji: "🧅" }, { text: "Lime", emoji: "🍋" } ],
    answer: "Avocado"
  },
  {
    question: "Which is the tallest mountain in the world?",
    options: [ { text: "K2", emoji: "🏔️" }, { text: "Kangchenjunga", emoji: "⛰️" }, { text: "Mount Everest", emoji: "🗻" }, { text: "Lhotse", emoji: "🌄" } ],
    answer: "Mount Everest"
  },
  {
    question: "In which city is the Eiffel Tower located?",
    options: [ { text: "Rome", emoji: "🇮🇹" }, { text: "London", emoji: "🇬🇧" }, { text: "Paris", emoji: "🇫🇷" }, { text: "Berlin", emoji: "🇩🇪" } ],
    answer: "Paris"
  },
  {
    question: "Which Disney movie features a princess named Belle?",
    options: [ { text: "The Little Mermaid", emoji: "🧜‍♀️" }, { text: "Cinderella", emoji: "👑" }, { text: "Beauty and the Beast", emoji: "🌹" }, { text: "Sleeping Beauty", emoji: "😴" } ],
    answer: "Beauty and the Beast"
  },
  {
    question: "What is the primary gas that we breathe in?",
    options: [ { text: "Oxygen", emoji: "💨" }, { text: "Carbon Dioxide", emoji: "😮‍💨" }, { text: "Nitrogen", emoji: "🌬️" }, { text: "Hydrogen", emoji: "💧" } ],
    answer: "Oxygen"
  },
  {
    question: "How many legs does a spider have?",
    options: [ { text: "6", emoji: "🐜" }, { text: "8", emoji: "🕷️" }, { text: "10", emoji: "🦀" }, { text: "4", emoji: "🐕" } ],
    answer: "8"
  },
  {
    question: "What color are bananas when they are ripe?",
    options: [ { text: "Green", emoji: "🟢" }, { text: "Red", emoji: "🔴" }, { text: "Yellow", emoji: "🟡" }, { text: "Blue", emoji: "🔵" } ],
    answer: "Yellow"
  },
  {
    question: "What do bees make?",
    options: [ { text: "Syrup", emoji: "🍁" }, { text: "Jam", emoji: "🍓" }, { text: "Honey", emoji: "🍯" }, { text: "Juice", emoji: "🍊" } ],
    answer: "Honey"
  },
  {
    question: "Which animal lays the largest eggs?",
    options: [ { text: "Chicken", emoji: "🐔" }, { text: "Ostrich", emoji: "🐦" }, { text: "Eagle", emoji: "🦅" }, { text: "Penguin", emoji: "🐧" } ],
    answer: "Ostrich"
  },
  {
    question: "What is the name of the toy cowboy in Toy Story?",
    options: [ { text: "Buzz Lightyear", emoji: "🚀" }, { text: "Woody", emoji: "🤠" }, { text: "Mr. Potato Head", emoji: "🥔" }, { text: "Slinky Dog", emoji: "🐕" } ],
    answer: "Woody"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [ { text: "Atlantic Ocean", emoji: "🌊" }, { text: "Indian Ocean", emoji: "🏝️" }, { text: "Arctic Ocean", emoji: "❄️" }, { text: "Pacific Ocean", emoji: "⛵" } ],
    answer: "Pacific Ocean"
  },
  {
    question: "What is the name of Harry Potter's owl?",
    options: [ { text: "Errol", emoji: "💌" }, { text: "Pigwidgeon", emoji: "✉️" }, { text: "Hedwig", emoji: "🦉" }, { text: "Crookshanks", emoji: "🐈" } ],
    answer: "Hedwig"
  },
  {
    question: "What is the color of an emerald?",
    options: [ { text: "Red", emoji: "🔴" }, { text: "Blue", emoji: "🔵" }, { text: "Green", emoji: "🟢" }, { text: "Yellow", emoji: "🟡" } ],
    answer: "Green"
  },
  {
    question: "How many sides does a triangle have?",
    options: [ { text: "3", emoji: "🔺" }, { text: "4", emoji: "⬛" }, { text: "5", emoji: "⭐" }, { text: "6", emoji: " hexagons" } ],
    answer: "3"
  },
  {
    question: "What is the sound a dog makes?",
    options: [ { text: "Meow", emoji: "🐈" }, { text: "Moo", emoji: "🐄" }, { text: "Bark", emoji: "🐕" }, { text: "Oink", emoji: "🐖" } ],
    answer: "Bark"
  },
  {
    question: "What is the name of the main character in 'The Lion King'?",
    options: [ { text: "Mufasa", emoji: "👑" }, { text: "Scar", emoji: "🔥" }, { text: "Simba", emoji: "🦁" }, { text: "Timon", emoji: "🐛" } ],
    answer: "Simba"
  },
  {
    question: "What do you use to write on a blackboard?",
    options: [ { text: "Pen", emoji: "🖊️" }, { text: "Chalk", emoji: "✍️" }, { text: "Crayon", emoji: "🖍️" }, { text: "Marker", emoji: "✒️" } ],
    answer: "Chalk"
  },
  {
    question: "Which fruit is red and has seeds on the outside?",
    options: [ { text: "Apple", emoji: "🍎" }, { text: "Strawberry", emoji: "🍓" }, { text: "Watermelon", emoji: "🍉" }, { text: "Cherry", emoji: "🍒" } ],
    answer: "Strawberry"
  },
  {
    question: "In the story 'The Three Little Pigs', what was the strongest house made of?",
    options: [ { text: "Straw", emoji: "🌾" }, { text: "Sticks", emoji: "🌿" }, { text: "Bricks", emoji: "🧱" }, { text: "Mud", emoji: "💧" } ],
    answer: "Bricks"
  },
  {
    question: "What is the largest desert in the world?",
    options: [ { text: "Sahara Desert", emoji: "🏜️" }, { text: "Gobi Desert", emoji: "🐫" }, { text: "Arabian Desert", emoji: "🌵" }, { text: "Antarctic Polar Desert", emoji: "❄️" } ],
    answer: "Antarctic Polar Desert"
  },
  {
    question: "What is the opposite of 'hot'?",
    options: [ { text: "Warm", emoji: "☀️" }, { text: "Cold", emoji: "🥶" }, { text: "Spicy", emoji: "🌶️" }, { text: "Sunny", emoji: "🌞" } ],
    answer: "Cold"
  },
  {
    question: "What does a paleontologist study?",
    options: [ { text: "Plants", emoji: "🌱" }, { text: "Stars", emoji: "⭐" }, { text: "Fossils", emoji: "🦴" }, { text: "Animals", emoji: "🦓" } ],
    answer: "Fossils"
  },
  {
    question: "Which of these is NOT a primary color?",
    options: [ { text: "Red", emoji: "🔴" }, { text: "Green", emoji: "🟢" }, { text: "Yellow", emoji: "🟡" }, { text: "Blue", emoji: "🔵" } ],
    answer: "Green"
  },
  {
    question: "What is the home of a bee called?",
    options: [ { text: "A nest", emoji: "🐦" }, { text: "A hive", emoji: "🐝" }, { text: "A web", emoji: "🕷️" }, { text: "A den", emoji: "🐻" } ],
    answer: "A hive"
  },
  {
    question: "Who is the villain in 'The Little Mermaid'?",
    options: [ { text: "Maleficent", emoji: "😈" }, { text: "Ursula", emoji: "🐙" }, { text: "Gaston", emoji: "💪" }, { text: "Jafar", emoji: "🐍" } ],
    answer: "Ursula"
  },
  {
    question: "What is the Earth's primary source of light and heat?",
    options: [ { text: "The Moon", emoji: "🌙" }, { text: "The Sun", emoji: "☀️" }, { text: "Stars", emoji: "⭐" }, { text: "Fire", emoji: "🔥" } ],
    answer: "The Sun"
  },
  {
    question: "Which sea creature has three hearts?",
    options: [ { text: "Shark", emoji: "🦈" }, { text: "Dolphin", emoji: "🐬" }, { text: "Octopus", emoji: "🐙" }, { text: "Whale", emoji: "🐋" } ],
    answer: "Octopus"
  },
  {
    question: "What is the first letter of the alphabet?",
    options: [ { text: "Z", emoji: "💤" }, { text: "A", emoji: "🅰️" }, { text: "B", emoji: "🅱️" }, { text: "C", emoji: "🆎" } ],
    answer: "A"
  },
  {
    question: "In which season do leaves fall from trees?",
    options: [ { text: "Spring", emoji: "🌸" }, { text: "Summer", emoji: "☀️" }, { text: "Autumn", emoji: "🍂" }, { text: "Winter", emoji: "❄️" } ],
    answer: "Autumn"
  },
  {
    question: "What is the name of the snowman in 'Frozen'?",
    options: [ { text: "Sven", emoji: "🦌" }, { text: "Kristoff", emoji: "🧑" }, { text: "Hans", emoji: "👑" }, { text: "Olaf", emoji: "☃️" } ],
    answer: "Olaf"
  },
  {
    question: "What is the main food of a panda?",
    options: [ { text: "Fish", emoji: "🐟" }, { text: "Bamboo", emoji: "🎍" }, { text: "Meat", emoji: "🥩" }, { text: "Berries", emoji: "🍓" } ],
    answer: "Bamboo"
  },
  {
    question: "Which of these is a reptile?",
    options: [ { text: "Frog", emoji: "🐸" }, { text: "Snake", emoji: "🐍" }, { text: "Bird", emoji: "🐦" }, { text: "Fish", emoji: "🐠" } ],
    answer: "Snake"
  },
  {
    question: "What do you call a group of fish?",
    options: [ { text: "A herd", emoji: "🐄" }, { text: "A flock", emoji: "🐑" }, { text: "A school", emoji: "🐠" }, { text: "A pack", emoji: "🐺" } ],
    answer: "A school"
  },
  {
    question: "What vehicle runs on a track and says 'choo-choo'?",
    options: [ { text: "Car", emoji: "🚗" }, { text: "Bus", emoji: "🚌" }, { text: "Train", emoji: "🚂" }, { text: "Boat", emoji: "⛵" } ],
    answer: "Train"
  },
  {
    question: "What is the currency of the United States?",
    options: [ { text: "Euro", emoji: "💶" }, { text: "Yen", emoji: "💴" }, { text: "Pound", emoji: "💷" }, { text: "Dollar", emoji: "💵" } ],
    answer: "Dollar"
  },
  {
    question: "Which animal is famous for its long neck?",
    options: [ { text: "Elephant", emoji: "🐘" }, { text: "Giraffe", emoji: "🦒" }, { text: "Kangaroo", emoji: "🦘" }, { text: "Hippo", emoji: "🦛" } ],
    answer: "Giraffe"
  },
  {
    question: "What is the opposite of 'day'?",
    options: [ { text: "Morning", emoji: "🌅" }, { text: "Night", emoji: "🌃" }, { text: "Noon", emoji: "☀️" }, { text: "Evening", emoji: "🌇" } ],
    answer: "Night"
  },
  {
    question: "Who lives in a pineapple under the sea?",
    options: [ { text: "Patrick Star", emoji: "⭐" }, { text: "Squidward Tentacles", emoji: "🐙" }, { text: "SpongeBob SquarePants", emoji: "🍍" }, { text: "Mr. Krabs", emoji: "🦀" } ],
    answer: "SpongeBob SquarePants"
  },
  {
    question: "How many days are in a week?",
    options: [ { text: "5", emoji: "🖐️" }, { text: "7", emoji: "🗓️" }, { text: "10", emoji: "🔟" }, { text: "12", emoji: "📅" } ],
    answer: "7"
  },
  {
    question: "What instrument has black and white keys?",
    options: [ { text: "Guitar", emoji: "🎸" }, { text: "Violin", emoji: "🎻" }, { text: "Piano", emoji: "🎹" }, { text: "Drums", emoji: "🥁" } ],
    answer: "Piano"
  },
  {
    question: "What is the color of the sky on a clear day?",
    options: [ { text: "Blue", emoji: "🔵" }, { text: "Green", emoji: "🟢" }, { text: "Red", emoji: "🔴" }, { text: "Black", emoji: "⚫" } ],
    answer: "Blue"
  },
  {
    question: "What is a baby dog called?",
    options: [ { text: "Kitten", emoji: "🐈" }, { text: "Puppy", emoji: "🐕" }, { text: "Cub", emoji: "🐻" }, { text: "Foal", emoji: "🐎" } ],
    answer: "Puppy"
  },
  {
    question: "Which planet is closest to the Sun?",
    options: [ { text: "Venus", emoji: "♀️" }, { text: "Earth", emoji: "🌍" }, { text: "Mars", emoji: "♂️" }, { text: "Mercury", emoji: "☿️" } ],
    answer: "Mercury"
  },
  {
    question: "What do you call the person who flies an airplane?",
    options: [ { text: "A driver", emoji: "🚗" }, { text: "A captain", emoji: "⛵" }, { text: "A pilot", emoji: "✈️" }, { text: "An engineer", emoji: "⚙️" } ],
    answer: "A pilot"
  },
  {
    question: "What food is Popeye famous for eating?",
    options: [ { text: "Carrots", emoji: "🥕" }, { text: "Spinach", emoji: "🥬" }, { text: "Broccoli", emoji: "🥦" }, { text: "Apples", emoji: "🍎" } ],
    answer: "Spinach"
  },
  {
    question: "How many players are on a soccer team on the field?",
    options: [ { text: "9", emoji: "⚾" }, { text: "10", emoji: "🏀" }, { text: "11", emoji: "⚽" }, { text: "12", emoji: "🏈" } ],
    answer: "11"
  },
  {
    question: "What is the capital of Italy?",
    options: [ { text: "Venice", emoji: "🛶" }, { text: "Milan", emoji: "👜" }, { text: "Rome", emoji: "🏛️" }, { text: "Naples", emoji: "🍕" } ],
    answer: "Rome"
  },
  {
    question: "Which is the largest bird in the world?",
    options: [ { text: "Eagle", emoji: "🦅" }, { text: "Albatross", emoji: "🐦" }, { text: "Ostrich", emoji: "🦤" }, { text: "Emu", emoji: "🇦🇺" } ],
    answer: "Ostrich"
  },
  {
    question: "What is the name of the green monster from 'Monsters, Inc.'?",
    options: [ { text: "Sully", emoji: "🟦" }, { text: "Mike Wazowski", emoji: "🟢" }, { text: "Randall", emoji: "🦎" }, { text: "Boo", emoji: "👧" } ],
    answer: "Mike Wazowski"
  },
  {
    question: "Which of these is a type of citrus fruit?",
    options: [ { text: "Banana", emoji: "🍌" }, { text: "Grape", emoji: "🍇" }, { text: "Orange", emoji: "🍊" }, { text: "Peach", emoji: "🍑" } ],
    answer: "Orange"
  },
  {
    question: "What is the name of the wizard in 'The Lord of the Rings'?",
    options: [ { text: "Dumbledore", emoji: "🧙" }, { text: "Merlin", emoji: "🪄" }, { text: "Gandalf", emoji: "✨" }, { text: "Saruman", emoji: "🔮" } ],
    answer: "Gandalf"
  },
  {
    question: "What do you call a house made of ice?",
    options: [ { text: "A cabin", emoji: "🏠" }, { text: "A tent", emoji: "⛺" }, { text: "An igloo", emoji: "🧊" }, { text: "A castle", emoji: "🏰" } ],
    answer: "An igloo"
  },
  {
    question: "What is the main language spoken in Spain?",
    options: [ { text: "Portuguese", emoji: "🇵🇹" }, { text: "Italian", emoji: "🇮🇹" }, { text: "Spanish", emoji: "🇪🇸" }, { text: "French", emoji: "🇫🇷" } ],
    answer: "Spanish"
  },
  {
    question: "Which of the five senses do you use your ears for?",
    options: [ { text: "Sight", emoji: "👀" }, { text: "Smell", emoji: "👃" }, { text: "Touch", emoji: "✋" }, { text: "Hearing", emoji: "👂" } ],
    answer: "Hearing"
  },
  {
    question: "What color is a ruby?",
    options: [ { text: "Blue", emoji: "💙" }, { text: "Red", emoji: "❤️" }, { text: "Green", emoji: "💚" }, { text: "Yellow", emoji: "💛" } ],
    answer: "Red"
  },
  {
    question: "What is the world's longest river?",
    options: [ { text: "Amazon River", emoji: "🌳" }, { text: "Nile River", emoji: "🐊" }, { text: "Yangtze River", emoji: "🐼" }, { text: "Mississippi River", emoji: "🇺🇸" } ],
    answer: "Nile River"
  },
  {
    question: "What is the name of the princess in 'Aladdin'?",
    options: [ { text: "Ariel", emoji: "🧜‍♀️" }, { text: "Jasmine", emoji: "🐯" }, { text: "Pocahontas", emoji: "🍃" }, { text: "Mulan", emoji: "🐉" } ],
    answer: "Jasmine"
  },
  {
    question: "How many wheels does a bicycle have?",
    options: [ { text: "1", emoji: "🛹" }, { text: "2", emoji: "🚲" }, { text: "3", emoji: "🛵" }, { text: "4", emoji: "🚗" } ],
    answer: "2"
  },
  {
    question: "What does a vegetarian eat?",
    options: [ { text: "Only meat", emoji: "🥩" }, { text: "Plants", emoji: "🥕" }, { text: "Fish and chicken", emoji: "🐟" }, { text: "Everything", emoji: "🍔" } ],
    answer: "Plants"
  },
  {
    question: "What is the national animal of Australia?",
    options: [ { text: "Koala", emoji: "🐨" }, { text: "Kangaroo", emoji: "🦘" }, { text: "Emu", emoji: "🐦" }, { text: "Wombat", emoji: "🐾" } ],
    answer: "Kangaroo"
  },
  {
    question: "In which country are the pyramids of Giza located?",
    options: [ { text: "Mexico", emoji: "🇲🇽" }, { text: "Egypt", emoji: "🇪🇬" }, { text: "Peru", emoji: "🇵🇪" }, { text: "Sudan", emoji: "🇸🇩" } ],
    answer: "Egypt"
  },
  {
    question: "Which superhero is known as the 'Man of Steel'?",
    options: [ { text: "Batman", emoji: "🦇" }, { text: "Spider-Man", emoji: "🕷️" }, { text: "Superman", emoji: "🦸" }, { text: "Iron Man", emoji: "🤖" } ],
    answer: "Superman"
  },
  {
    question: "What is the name of the talking donkey in 'Shrek'?",
    options: [ { text: "Puss in Boots", emoji: "👢" }, { text: "Donkey", emoji: "🐴" }, { text: "Gingy", emoji: "🍪" }, { text: "Dragon", emoji: "🐉" } ],
    answer: "Donkey"
  },
  {
    question: "What is the largest cat in the world?",
    options: [ { text: "Lion", emoji: "🦁" }, { text: "Siberian Tiger", emoji: "🐅" }, { text: "Jaguar", emoji: "🐆" }, { text: "Leopard", emoji: "🐾" } ],
    answer: "Siberian Tiger"
  },
  {
    question: "What is the process by which plants make their own food called?",
    options: [ { text: "Respiration", emoji: "😮‍💨" }, { text: "Photosynthesis", emoji: "🌞" }, { text: "Transpiration", emoji: "💧" }, { text: "Germination", emoji: "🌱" } ],
    answer: "Photosynthesis"
  },
  {
    question: "Which of these animals is a mammal?",
    options: [ { text: "Shark", emoji: "🦈" }, { text: "Crocodile", emoji: "🐊" }, { text: "Dolphin", emoji: "🐬" }, { text: "Penguin", emoji: "🐧" } ],
    answer: "Dolphin"
  },
  {
    question: "What is the capital of the United Kingdom?",
    options: [ { text: "Manchester", emoji: "⚽" }, { text: "Liverpool", emoji: "🎸" }, { text: "London", emoji: "🇬🇧" }, { text: "Edinburgh", emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" } ],
    answer: "London"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [ { text: "Vincent van Gogh", emoji: "🌻" }, { text: "Pablo Picasso", emoji: "🎨" }, { text: "Leonardo da Vinci", emoji: "🖼️" }, { text: "Michelangelo", emoji: "👨‍🎨" } ],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the name of the main character in 'Finding Nemo'?",
    options: [ { text: "Nemo", emoji: "🐠" }, { text: "Marlin", emoji: "🧡" }, { text: "Dory", emoji: "💙" }, { text: "Bruce", emoji: "🦈" } ],
    answer: "Marlin"
  },
  {
    question: "Which fictional city is the home of Batman?",
    options: [ { text: "Metropolis", emoji: "🏙️" }, { text: "Gotham City", emoji: "🌃" }, { text: "Star City", emoji: "⭐" }, { text: "Central City", emoji: "⚡" } ],
    answer: "Gotham City"
  },
  {
    question: "How many bones are in the adult human body?",
    options: [ { text: "206", emoji: "💀" }, { text: "300", emoji: "🦴" }, { text: "150", emoji: "💪" }, { text: "256", emoji: "🧠" } ],
    answer: "206"
  },
  {
    question: "What is the currency of Japan?",
    options: [ { text: "Won", emoji: "🇰🇷" }, { text: "Yuan", emoji: "🇨🇳" }, { text: "Yen", emoji: "🇯🇵" }, { text: "Baht", emoji: "🇹🇭" } ],
    answer: "Yen"
  },
  {
    question: "What type of fish is Nemo?",
    options: [ { text: "Goldfish", emoji: "🐟" }, { text: "Clownfish", emoji: "🐠" }, { text: "Angelfish", emoji: "🐡" }, { text: "Guppy", emoji: "🦐" } ],
    answer: "Clownfish"
  },
  {
    question: "What is the name of the yellow bird on 'Sesame Street'?",
    options: [ { text: "Elmo", emoji: "🔴" }, { text: "Big Bird", emoji: "🟡" }, { text: "Cookie Monster", emoji: "🍪" }, { text: "Oscar the Grouch", emoji: "🗑️" } ],
    answer: "Big Bird"
  },
  {
    question: "What is the main gas found in the air we breathe?",
    options: [ { text: "Oxygen", emoji: "💨" }, { text: "Nitrogen", emoji: "🌬️" }, { text: "Carbon Dioxide", emoji: "😮‍💨" }, { text: "Hydrogen", emoji: "💧" } ],
    answer: "Nitrogen"
  },
  {
    question: "What is the name of the bear in 'The Jungle Book'?",
    options: [ { text: "Bagheera", emoji: "🐈‍⬛" }, { text: "Shere Khan", emoji: "🐅" }, { text: "Baloo", emoji: "🐻" }, { text: "Kaa", emoji: "🐍" } ],
    answer: "Baloo"
  },
  {
    question: "What is the most spoken language in the world?",
    options: [ { text: "English", emoji: "🇬🇧" }, { text: "Spanish", emoji: "🇪🇸" }, { text: "Mandarin Chinese", emoji: "🇨🇳" }, { text: "Hindi", emoji: "🇮🇳" } ],
    answer: "Mandarin Chinese"
  },
  {
    question: "What is the name of the superhero who can climb walls?",
    options: [ { text: "Batman", emoji: "🦇" }, { text: "Superman", emoji: "🦸" }, { text: "Spider-Man", emoji: "🕷️" }, { text: "Iron Man", emoji: "🤖" } ],
    answer: "Spider-Man"
  },
  {
    question: "What is the name of the pig in 'Charlotte's Web'?",
    options: [ { text: "Babe", emoji: "🐖" }, { text: "Wilbur", emoji: "🐷" }, { text: "Porky", emoji: "🐽" }, { text: "Hamm", emoji: "💰" } ],
    answer: "Wilbur"
  },
  {
    question: "How many legs does an insect have?",
    options: [ { text: "4", emoji: "🐾" }, { text: "6", emoji: "🐜" }, { text: "8", emoji: "🕷️" }, { text: "10", emoji: "🦀" } ],
    answer: "6"
  },
  {
    question: "What is the largest country in the world by area?",
    options: [ { text: "Canada", emoji: "🇨🇦" }, { text: "China", emoji: "🇨🇳" }, { text: "USA", emoji: "🇺🇸" }, { text: "Russia", emoji: "🇷🇺" } ],
    answer: "Russia"
  },
  {
    question: "What is the sweet substance collected by bees?",
    options: [ { text: "Pollen", emoji: "🌸" }, { text: "Nectar", emoji: "🍯" }, { text: "Sap", emoji: "🍁" }, { text: "Water", emoji: "💧" } ],
    answer: "Nectar"
  },
  {
    question: "In what country would you find the kangaroo?",
    options: [ { text: "South Africa", emoji: "🇿🇦" }, { text: "India", emoji: "🇮🇳" }, { text: "Australia", emoji: "🇦🇺" }, { text: "Brazil", emoji: "🇧🇷" } ],
    answer: "Australia"
  },
  {
    question: "What color are Smurfs?",
    options: [ { text: "Green", emoji: "🟢" }, { text: "Blue", emoji: "🔵" }, { text: "Yellow", emoji: "🟡" }, { text: "Red", emoji: "🔴" } ],
    answer: "Blue"
  },
  {
    question: "What is the home of a polar bear?",
    options: [ { text: "The forest", emoji: "🌲" }, { text: "The jungle", emoji: "🌴" }, { text: "The Arctic", emoji: "❄️" }, { text: "The desert", emoji: "🌵" } ],
    answer: "The Arctic"
  }
];
