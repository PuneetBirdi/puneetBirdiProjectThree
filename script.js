$(document).ready(function(){

    //initialize array of all transactions
    transactions = [];

    let totalIncome = 0;
    let totalExpense = 0;
    let netCashFlow = 0;

    //Generate and return an ID for the transaction, incremented sequentially based on the length of the array
    function generateID(){
        id = 1000000 + (transactions.length + 1);
        return id;
    }

    //Push the transaction into the array
    function updateArray(transaction){
        transactions.push(transaction);
    }

    //updating totals
    function updateTotals(transaction){
        //filter transaction amount depending on its type
        if(transaction.transactionType === 'income'){
            totalIncome = totalIncome + transaction.transactionAmt;
        }else if(transaction.transactionType === 'expense'){
            totalExpense = totalExpense + transaction.transactionAmt;
        }
        netCashFlow = totalIncome - totalExpense;

        return netCashFlow, totalIncome, totalExpense;
    }

    //format into money - this was taken from a stackoverflow comment
    function formatMoney(number){
        return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      }

    //update DOM function
    function updateDOM(transaction, totalIncome, totalExpense, netCashflow){

        //update totals
        $("#totalIncome").html(formatMoney(totalIncome));
        $("#netCashflow").html(formatMoney(netCashFlow)); 
        $("#totalExpense").html(formatMoney(totalExpense));

        //append list
        $("#transactionList").prepend(
            `<li class=${transaction.transactionType} id=${transaction.transactionID}>
            <div class='listBtns'>
                <button class='deleteBtn btn')>
                Remove
                </button>

                <button class='editBtn btn'>
                Edit
                </button>
            </div>
            <div class='listDesc'>${transaction.transactionDesc}</div>
            <div class='listAmt'>${formatMoney(transaction.transactionAmt)}</div>
            </li>`)
    }

    //adjust the form, used for both clearing and editing
    function adjustForm(transactionType, transactionDesc, transactionAmt){
        $("#addExpense").prop("checked", false);
        $("#addIncome").prop("checked", false);
        $("#transactionDesc").val(transactionDesc);
        $("#transactionAmt").val(transactionAmt);
    }

    //event listener for when transaction is submitted
    $("form").submit(function(){
        event.preventDefault();

        //pull all user inputs into variables
            const transaction = {
                transactionID: generateID(),
                transactionType: $("input[name='transactionType']:checked").val(),
                transactionDesc: $("#transactionDesc").val(),
                transactionAmt: parseFloat($("#transactionAmt").val())
                }
            
                console.log(transaction);
            
        //if variables satisfy requirements, run the next functions, otherwise throw an alert error
            if(
            typeof transaction.transactionType !== 'undefined' && 
            transaction.transactionDesc.trim() !== "" &&
            transaction.transactionAmt > 0
            ){
            //function to update totals
            updateTotals(transaction);
            //function to update DOM with totals
            updateDOM(transaction, totalIncome, totalExpense, netCashFlow);
            //call function to update the array;
            updateArray(transaction);
            //reset form
            adjustForm("", "", "");
            }else{
                alert("Please fill out all of the required inputs.")
            }
        });
    
    //event listener for delete transaction
    $("form").submit(function(){
        deleteTransaction();
    }
    function deleteTransaction(transactionID){
        //remove the transaction from the DOM
        $(`${transactionID}`).remove();
        //remove the transaction from the array

        //updateDOM
    }
});