$(document).ready(function(){

    //initialize array of all transactions

    transactions = [];

    //event listener for when transaction is submitted
    $("form").submit(function(){
        event.preventDefault();

        //package all user inputs into an object
        const transaction = {
            transactionID: generateID(),
            transactionType: $("#transactionType").val(),
            transactionDesc: $("#transactionDesc").val(),
            transactionAmt: $("#transactionAmt").val()
        }

        console.log(transaction);
        console.log(transactions);
        //call function to update the DOM
        // updateDOM(transaction);

        //call function to update the array;
        updateArray(transaction);
      });

    //Generate and return an ID for the transaction, incremented sequentially based on the length of the array
    function generateID(){
        id = 1000000 + (transactions.length + 1);
        console.log(id);
        return id;
    }

    //Push the transaction into the array
    function updateArray(transaction){
        transactions.push(transaction);
    }
    
});