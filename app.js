
//Budget Controller
var budgetController = (function(){

var Expense = function(Id,description,value){
    this.Id = Id;
    this.description =  description;
    this.value = value;
}

var Income = function(Id,description,value){
    this.Id = Id;
    this.description =  description;
    this.value = value;
}


var data = {
    allItems:{
       exp:[],
        inc:[] 
    },
    totals:{
        exp:0,
        inc:0
    }
 
};

    return{
        addItems:function(type,des,val){
            var newItem,ID;
            //create new Id 
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].Id +1;
            }else{
                 ID=0;
            }
               
            
            
            //create new item base on inc or exp type
            if(type==='exp'){
                newItem =new Expense(ID,des.val);
             }else if(type==='inc'){
                 newItem =new Income(ID,des.val);
             }
             //push into our data structure
             data.allItems[type].push(newItem); 
             return newItem;
          },

          
    };
})();



//UI Controller
var UIController =(function(){

var DOMStrings = {
    inputType:'.add__type',
    inputDescription:'.add__description',
    inputValue:'.add__value',
    inputBtn:'.add__btn',
    incomeContainer:'income__list',
    expenseContainer:'expenses__list'
};


return {
    getInput: function(){
        return{
        type:document.querySelector(DOMStrings.inputType).value,          //will be either inc or exp
        description:document.querySelector(DOMStrings.inputDescription).value,
        value:document.querySelector(DOMStrings.inputValue).value
       }; 
    },

    addListItem: function(obj,type){
        var html,newHtml,elements;
        //create html string with placeholder text
        if(type==='inc'){
            elements = DOMStrings.incomeContainer;
            html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
       
        }else{
            elements=DOMStrings.expenseContainer;
             html = ' <div class="item clearfix" id="expense-%id%"<div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        
         

        ///Replace the placeholder text with some actual data
        newHtml = html.replace('%id%',obj.Id);
        newHtml = newHtml.replace('%description%',obj.description);
        newHtml = newHtml.replace('%value%',obj.value);
        //Insert html into DOM
        document.querySelector(elements).insertAdjacentHTML('beforeend',newHtml);
    },

    getDOMStrings: function(){
        return DOMStrings;
    }

}


})();









//App Controller
var controller = (function(budgetCtrl,UICtrl){

   var setUpEventListner = function(){
    document.querySelector(DOM.inputBtn).addEventListener('click', CtrlAddItem);

document.addEventListener('keypress',function(event){
    if(event===13 || event.which===13){
        CtrlAddItem();
    };

    });
};

var DOM= UICtrl.getDOMStrings();

var CtrlAddItem = function(){
    var input, newItem;
    //get input data
    input = UICtrl.getInput();

    //add item to budget controller
    newItem=budgetCtrl.addItems(input.type,input.description,input.value);
    //add item to UI
    UICtrl.addListItem(newItem,input.type);

    //calculate the budget

    //need to display BUdget, update UI
    
}
    return{
            init:function(){
                console.log('Application has started');
                setUpEventListner();    
            }
    };

})(budgetController,UIController);

controller.init();
