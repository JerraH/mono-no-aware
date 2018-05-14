const itemsArr = [
    { id: 'bow', name: 'Bow and Arrow', description: 'This is a great looking bow and arrow.', image: 'bow.png' },
    { id: 'koto', name: 'Koto', description: 'A beautiful stringed musical instrument of the finest make.  A single, gentle touch it and it begins to play softly; startled, you pull back your hand.', image: 'koto.png' },
    { id: 'fan', name: 'Folding Fan', description: 'Sure to impress!' },
    { id: 'lamp', name: 'Paper Lantern', description: 'Delicate but comes in handy.' },
    { id: 'sake', name: 'Jug of Sake', description: 'Glug glug glug!', image: 'Sake.png' },
    { id: 'calligraphyBrush', name: 'Calligraphy Brush', description: 'A stroke of genius.' },
    { id: 'inari', name: 'inari tofu roll', description: 'Delicious!' }
];

// map items array to object
let items = {};
itemsArr.forEach(item => {
    items[item.id] = item;
});

export default items;
