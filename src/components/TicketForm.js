import React, { useState, useEffect } from "react";

export default function TicketForm({dispatch, editingTicket}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");


  useEffect(()=> {
    if(editingTicket){
        setTitle(editingTicket.title)
        setDescription(editingTicket.description)
        setPriority(editingTicket.priority)
    }else{
        clearForm()
    }

  }, [editingTicket])

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketDate = {
        id: editingTicket ? editingTicket.id: new Date().toISOString(),
        title,
        description,
        priority
    };

    dispatch({
        type: editingTicket? "UPDATE_TICKET" : "ADD_TICKET",
        payload: ticketDate
    })

    clearForm();
  };

  const handleTitle = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={handleTitle}
        ></input>
      </div>

      <div>
        <label>Description</label>
        <textarea
          type="text"
          value={description}
          className="form-input"
          onChange={handleDescription}
        ></textarea>
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>

        {console.log(Object.entries(priorityLabels))}

        {Object.entries(priorityLabels).map(([value, label]) => {
          return (
            <label key={value} className="priority-label">
              <input type="radio" 
              value={value} 
              checked={priority === value} 
              className="priority-input"
              onChange={(e)=> setPriority(e.target.value)}
              ></input>
              {label}
            </label>
          );
        })}
      </fieldset>

      <button type="submit" className="button">Submit here</button>
    </form>
  );
}
