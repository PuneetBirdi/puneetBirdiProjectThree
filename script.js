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

    //Push the transaction into the all transactions array and also separate arrays depending on the transaction type
    function updateArray(transaction){
        transactions.push(transaction);
        updateTotals(transactions);
    }

    //update total summary values
    function updateTotals(array){
        totalIncome = 0;
        totalExpense = 0;
        array.forEach(element => {
            if(element.transactionType === "income"){
                totalIncome = totalIncome + element.transactionAmt;
            }else if(element.transactionType === "expense"){
                totalExpense = totalExpense + element.transactionAmt;
            }
        });
        netCashFlow = totalIncome - totalExpense;
    }
    //format into money - this was taken from a stackoverflow comment
    function formatMoney(number){
        return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      }

    //update summary values in DOM
    function updateDOMSummary(totalIncome, totalExpense, netCashflow){

        //update totals
        $("#totalIncome").html(formatMoney(totalIncome));
        $("#netCashflow").html(formatMoney(netCashFlow)); 
        $("#totalExpense").html(formatMoney(totalExpense));
        }
    //update list in DOM
    function updateDOMList(transaction){
        $("#transactionList").prepend(
            `<tr id=${transaction.transactionID} class= "${transaction.transactionType}">
                <td class = 'transactionBtn'>
                    <button id="deleteBtn" data-transactionID= ${transaction.transactionID}><i class="fas fa-trash-alt fa-lg")"></i></button>
                    <button id="editBtn" data-transactionID= ${transaction.transactionID}<i class="fas fa-sliders-h fa-lg"></i>
                </td>
                <td class='description'>${transaction.transactionDesc}</td>
                <td class="amount">${formatMoney(transaction.transactionAmt)}</td>
            </tr>`
          )
    }

    //adjust the form, used for both clearing and editing
    function adjustForm(transactionType, transactionDesc, transactionAmt){
        $("#addExpense").prop("checked", false);
        $("#addIncome").prop("checked", false);
        $("#transactionDesc").val(transactionDesc);
        $("#transactionAmt").val(transactionAmt);
    }

    //event listener for delete transaction
    $(document).on("click", '#deleteBtn', function(){
        deleteID = $(this).attr('data-transactionID');
        //remove transaction from DOM
        $(`#${deleteID}`).remove();
        //filter out transaction from array
        transactions = transactions.filter(function(object){
            return (object.transactionID != deleteID)
        })
        //update total values
        updateTotals(transactions);
        updateDOMSummary(totalIncome, totalExpense, netCashFlow);
    });

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
        //if variables satisfy requirements, run the next functions, otherwise throw an alert error
            if(
            typeof transaction.transactionType !== 'undefined' && 
            transaction.transactionDesc.trim() !== "" &&
            transaction.transactionAmt > 0
            ){
            //call function to update the array;
            updateArray(transaction);
            //function to update DOM with totals
            updateDOMSummary(totalIncome, totalExpense, netCashFlow);
            //update DOM List
            updateDOMList(transaction);
            //reset form
            adjustForm("", "", "");
            }else{
                alert("Please fill out all of the required inputs.")
            }
        });
});