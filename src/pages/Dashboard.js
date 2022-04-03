import { useState, useEffect, useContext } from "react";
import TicketCard from "../components/TickerCard";
import axios from "axios";
import CategoriesContext from '../context'

const Dashboard = () => {
  // put dummy data here

  const [tickets, setTickets] = useState(null)

  // const [categories, setCategories ] = useState(null)

  const { categories, setCategories } = useContext(CategoriesContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.get("http://localhost:8000/tickets");
    
    const dataObject = response.data.data;
    
    const arrayOfKeys = Object.keys(dataObject);
    
    const arrayOfData = Object.keys(dataObject).map((key) => dataObject[key]);

    // console.log('ArrayofKeys', arrayOfKeys)

    // console.log('ArrayofData',arrayOfData);

    const formattedArray = []

    arrayOfKeys.forEach((key, index)=> {
      const formattedData = { ...arrayOfData[index]}
      formattedData['documentId'] = key
      formattedArray.push(formattedData)


    })
    console.log('Array Formatted',formattedArray)

    // --- Set Array formatted 

    setTickets(formattedArray)

  }, []);

  useEffect(() => {
    setCategories([...new Set(tickets?.map(({category}) => category))])
  }, [tickets])

  console.log('categories', categories)

  const colors = [
    "rgb(255,179,186)",
    "rgb(255,223,186)",
    "rgb(255,255,186)",
    "rgb(186,255,201)",
    "rgb(186,255,255)",
  ];

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category))
  ]

  console.log('unique Categories', uniqueCategories);

  return (
    <div className="dashboard">
      <h1>Visão Atividades</h1>
      <div className="ticket-container">
        {tickets &&
          uniqueCategories?.map((UniqueCategory, categoryIndex) => (
            <div key={categoryIndex}>
              <h3>{UniqueCategory}</h3>
              {tickets
                .filter((ticket) => ticket.category === UniqueCategory)
                .map((filteredTicket, _index) => (
                  <TicketCard
                    id={_index}
                    // color={filteredTicket.color}
                    color={colors[categoryIndex] || colors[0]}
                    ticket={filteredTicket}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
