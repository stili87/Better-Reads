import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './bookshelfButton.css'
import { addBookToBookshelfThunk, removeBookFromBookshelfThunk } from "../../store/bookshelves";
import { Link } from "react-router-dom";

const BookshelfButton = ({ thisBook }) => {
	const sessionUser = useSelector((state) => state.session.user)
	const dispatch = useDispatch()
	const bookshelves = Object.values(useSelector(state => state.bookshelves)).filter(bookshelf => bookshelf.user_id === sessionUser.id)
	const [dropDownOpen, setDropDownOpen] = useState(false)

	useEffect(() => {
		const closeDropdown = e => {
				if (e.path[1].className !== 'dont-close' && e.path[1].className !== 'dont-close' && e.path[0].className !== 'fa-solid fa-caret-down dont-close' && e.path[0].className !== 'dont-close' ) {
						setDropDownOpen(false)
				}
		}

		document.body.addEventListener('click', closeDropdown)

		return () => document.body.removeEventListener('click', closeDropdown)
	}, [])

	const handleAddToBookshelf = async (e) => {
		let bookshelf = bookshelves.find(bookshelf => bookshelf.id === Number(e.target.attributes[1].value))

		const payload = {
			bookshelf_id: bookshelf.id,
			user_id: sessionUser.id,
			book: thisBook,
		}

		await dispatch(addBookToBookshelfThunk(payload))
		setDropDownOpen(false)
	}

	const handleRemoveFromBookshelf = async (e) => {

		let bookshelf = bookshelves.find(bookshelf => bookshelf.id === Number(e.target.attributes[1].value))


		await dispatch(removeBookFromBookshelfThunk(bookshelf.id, thisBook.id))
		setDropDownOpen(false)

	}

	const handleDropDownClick = (e) => {
		setDropDownOpen(!dropDownOpen)
	}

	return (
		<div>
			<div id='read-status-main' className='dont-close'>
				<div id='read-status-button-container'>
					<div id='read-status-current'>Add to Bookshelf</div>

					<div id='read-status-button' className='dont-close' onClick={(e) => handleDropDownClick(e)}><i className="fa-solid fa-caret-down dont-close"></i></div>
				</div>
				{dropDownOpen && 
				<div>
					<div id='read-status-select' className='dont-close'>
						{bookshelves.length > 0 ? bookshelves.map(bookshelf => (
							bookshelf['books'][thisBook.id] 
								? <div id='bookshelf-option' onClick={e => handleRemoveFromBookshelf(e)} value={bookshelf.id} key={bookshelf.id}><i className="fa-solid fa-check"></i>{bookshelf.name}</div> 
								: <div id='bookshelf-option' onClick={e => handleAddToBookshelf(e)} value={bookshelf.id} key={bookshelf.id}>{bookshelf.name}</div> 
							
						)) : <Link to='/bookshelves/all' id='bookshelf-option'>Click Here to go to My Books to make a bookshelf</Link> }
					</div>
				</div>
				}
			</div>
		</div>
	)
}

export default BookshelfButton
