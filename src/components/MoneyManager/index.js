import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    amountInput: '',
    transactionList: [],
    titleInput: '',
    typeInput: transactionTypeOptions[0].optionId,
  }

  getTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  getTypeInput = event => {
    this.setState({typeInput: event.target.value})
  }

  deleteTransaction = id => {
    const {transactionList} = this.state

    const updatedTransactions = transactionList.filter(e => e.id !== id)
    this.setState({
      transactionList: updatedTransactions,
    })
  }

  onClickAddTransaction = event => {
    event.preventDefault()

    const {titleInput, amountInput, typeInput} = this.state

    const selectedOption = transactionTypeOptions.find(
      eachOption => eachOption.optionId === typeInput,
    )
    const {displayText} = selectedOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: transactionTypeOptions[0].optionId,
    }))
  }

  getIncome = () => {
    const {transactionList} = this.state
    let totalIncome = 0
    transactionList.forEach(e => {
      if (e.type === transactionTypeOptions[0].displayText) {
        totalIncome += e.amount
      }
    })

    return totalIncome
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let totalExpenses = 0

    transactionList.forEach(e => {
      if (e.type === transactionTypeOptions[1].displayText) {
        totalExpenses += e.amount
      }
    })

    return totalExpenses
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {typeInput, amountInput, transactionList, titleInput} = this.state

    const totalIncome = this.getIncome()
    const totalExpenses = this.getExpenses()
    const totalBalance = this.getBalance()

    return (
      <div>
        <div className="money-manager-header">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your
            <span className="span-heading"> Money Manager</span>
          </p>
        </div>
        <ul>
          <MoneyDetails
            balance={totalBalance}
            income={totalIncome}
            expenses={totalExpenses}
          />
        </ul>
        <div className="history-card-container">
          <div className="transaction-card-container">
            <h1 className="transaction-heading">Add Transaction</h1>
            <form
              className="form-controls"
              onSubmit={this.onClickAddTransaction}
            >
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={titleInput}
                placeholder="Title"
                onChange={this.getTitleInput}
              />
              <label htmlFor="Amount">AMOUNT</label>
              <input
                type="text"
                id="Amount"
                value={amountInput}
                placeholder="Amount"
                onChange={this.getAmountInput}
              />
              <label htmlFor="type">TYPE</label>
              <select id="type" onChange={this.getTypeInput} value={typeInput}>
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>
          <div className="history-card">
            <h1>History</h1>
            <div className="table-header">
              <p className="table-title">Title</p>
              <p className="table-title">Amount</p>
              <p className="table-title">Type</p>
            </div>
            <ul>
              {transactionList.map(each => (
                <TransactionItem
                  key={each.id}
                  deleteTransaction={this.deleteTransaction}
                  transactionList={each}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
