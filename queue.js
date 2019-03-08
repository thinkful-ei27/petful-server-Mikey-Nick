

const cats = [{
  imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street',
  animal: 'cat'
},
{
  imageURL: 'https://media.licdn.com/dms/image/C4D03AQHZ-6yyqVB_mA/profile-displayphoto-shrink_800_800/0?e=1557360000&v=beta&t=03_sR7NHm_oHgyV-dRjHQ_gtVsQzMZKZjkoJPRRDaI4',
  imageDescription: `Look hes chillen!`,
  name: 'Peter',
  sex: 'Male',
  age: 6,
  breed: 'NorEaster',
  story: 'Thinkful grad',
  animal: 'cat'
},
];

const dogs = [{
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away',
  animal: 'dog'
},
{
  imageURL: 'https://media.licdn.com/dms/image/C5103AQEv9ADgSV2xOg/profile-displayphoto-shrink_800_800/0?e=1557360000&v=beta&t=nCEDVVxrTlsr2_6qEcGkjgzPEMh2w3m6a6G2j7Gl0SY',
  imageDescription: `He's a smiler!`,
  name: 'John',
  sex: 'Male',
  age: 5,
  breed: 'Marylander',
  story: 'Thinkful grad',
  animal: 'dog'
}
];


class _Node {
  constructor(value) {
    this.value = value,
      this.next = null,
      this.prev = null;
  }
}
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }
  enqueue(data) {
    //create a node with the data that you want to add to the queue
    const node = new _Node(data);
    //if the queue is empty, 
    //make the node the first node on the queue
    if (this.first === null) {
      this.first = node;
    }
    //if there is something on the queue already
    //then take the node that is currently at the end of the queue
    //and link it to the new node
    if (this.last) {
      node.next = this.last;
      this.last.prev = node;
    }
    //make the new node the last item on the queue
    this.last = node;
  }
  dequeue() {
    //if the queue is empty, there is nothing to return
    if (this.first === null) {
      return;
    }
    //make the first item on the queue to be the 
    //the item that is next on the line 
    // the item after the current first item
    const node = this.first;
    this.first = node.prev;
    //if this is the last item in the queue
    if (node === this.last) {
      this.last = null;
    }

    return node.value;
  }

  peek(){
    return this.first.value;
  }
}

const Dogs = new Queue();
Dogs.enqueue(dogs[0]);
Dogs.enqueue(dogs[1]);

const Cats = new Queue();
Cats.enqueue(cats[0]);
Cats.enqueue(cats[1]);


module.exports = { Dogs, Cats };



