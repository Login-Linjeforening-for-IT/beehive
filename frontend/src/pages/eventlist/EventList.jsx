import EventListItem from './EventListItem'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import EventListFilter from './EventListFilter'

const EventList = ( {categoryData,events} ) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState([
    {category_name:'LOGIN',color:'fd8738',isChecked: false, isVisible: false},
    {category_name:'CTF',color:'2da62b',isChecked:false, isVisible: false},
    {category_name:'TEKKOM',color:'a206c9',isChecked:false, isVisible: false},
    {category_name:'KARRIEREDAG',color:'02dede',isChecked:false, isVisible: false},
    {category_name:'FADDERUKA',color:'fa75a6',isChecked:false, isVisible: false},
    {category_name:'SOCIAL',color:'d62f43',isChecked:false, isVisible: false},
    {category_name:'BEDPRES',color:'4060e3',isChecked:false, isVisible: false},
    {category_name:'ANNET',color:'fa75a6',isChecked:false, isVisible: false},
  ])

  useEffect(() => {
    // Code to check which filter options should be active.
    const newState = categories.map(obj => {
      let found = false
      events.map(evt => {
        if (obj.category_name.toLowerCase() === evt.category.toLowerCase()) {
          found = true
        }
      })
      return {...obj, isVisible: found}
    })

    setCategories(newState)
  }, [])

  const resetFilter = () => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setSearchTerm('')

    const newState = categories.map(obj => {
      return {...obj, isChecked: false}
    })
    setCategories(newState);
  }

  const isAllUnselected = () => {
    let allVisible = true

    categories.map(obj => {
      if (obj.isChecked) allVisible = false;
    })

    return allVisible
  }

  const handleCategoryChange = (e) => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    const newState = categories.map(obj => {
      if (obj.category_name.toLowerCase() === e.target.name.toLowerCase()) {
        return {...obj, isChecked: !obj.isChecked}
      }
      return obj
    })

    setCategories(newState);
  }

  const handleSearchChange = event => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    setSearchTerm(event.target.value)
  }

  return(
    <div className='event-grid-wrapper'>
      <div className='event-grid-wrapper--right'>
        <EventListFilter
          categories={categories}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleCategoryChange={handleCategoryChange}
          resetFilter={resetFilter}
        />
      </div>
      <ul className='event-grid-wrapper--left event-list'>
        {
          events
            .filter((val) => {
            if (isAllUnselected()) {
              return true;
            } else {
              let show = false;

              categories.map(obj => {
                if (obj.category_name.toLowerCase() === val.category.toLowerCase()) show = obj.isChecked;
              })

              return show;
            }
          }).filter((obj => {
            if (obj.eventname.toLowerCase().includes(searchTerm.toLowerCase())) return true;

            return false;
          })).map((evt) => (
            <li key={evt.eventID}>
              <Link to={'/events/' + evt.eventID}>
                <EventListItem category={categoryData.find(c => c.Name === evt.category)} evt={evt} />
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default EventList;
