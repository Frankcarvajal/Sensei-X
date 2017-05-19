
function createNode(data=null, next=null, prev=null) {
  return{
    data,
    next,
    prev
  }  
}
function shuffle(array) {
    for(let i=0; i<array.length*4; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomIndex2 = Math.floor(Math.random() * array.length);
    let temp = array[randomIndex2];
    array[randomIndex2] = array[randomIndex];
    array[randomIndex]=temp;
    }
    return array;
}

export default class Queue {
  constructor(num) {
    this.first=null;
    this.last=null;
    this.fill(num);
  }
  
  fill(count) {
    let questionsOrder = [];
    for(let i=0; i<count; i++) {
    questionsOrder.push(i);
    }
    shuffle(questionsOrder);
    for(let j=0; j<count; j++) {
      this.enqueue(questionsOrder[j]);
    }
  }
  
  enqueue(data) {
    const node = createNode(data);

    if (this.last) {
        node.next = this.last;
        this.last.prev = node;
    }

    this.last = node;

    if (this.first === null) {
        this.first = node;
    }
  }

  dequeue() {
    if (this.first === null) {
        return;
    }

    const node = this.first;
    this.first = node.prev;

    if (node === this.last) {
        this.last = null;
    }

    return node.data;
  }
  requeue() {
    if (this.first === null) {
        return;
    }

    const node = this.first;
    this.first = node.prev;

    if (node === this.last) {
        this.last = null;
    }
    this.last.prev = node;
    this.last= node;
    this.last.prev=null;
    
    return node.data;
  }
  
  enqueueCut() {
    if (this.first === null) {
      return;
    }
    
    const node= this.first;
    this.first = node.prev;
    
    if (node === this.last) {
        this.last = null;
    }
    
    
    node.prev= node.prev.prev;
    this.first.prev = node;
    node.prev.prev.next= node;
    
    return node.data;
    
  }
}
