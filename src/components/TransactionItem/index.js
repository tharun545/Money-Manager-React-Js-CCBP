// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionList, deleteTransaction} = props
  const {id, title, amount, type} = transactionList

  const onDelete = () => {
    deleteTransaction(id)
  }

  return (
    <li className="transaction-item">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">{amount}</p>
      <p className="transaction-text">{type}</p>
      <button
        data-testid="delete"
        type="button"
        className="delete-btn"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
