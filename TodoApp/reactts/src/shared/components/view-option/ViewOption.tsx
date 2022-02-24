import React from "react";

interface ViewOptionsProps{
  setFilter: (filter:string)=>void
}
const ViewOptions = (props:ViewOptionsProps) => {
  
  const HandleChangeFilter=(e:React.ChangeEvent<{
    value: string
  }>)=>{
    console.log(e.target.value)
    props.setFilter(e.target.value)
  }
  return (
    <div className="view-options">
      <div className="filter">
        <label>Filter</label>
        <select id="filter" name="filter" onChange={HandleChangeFilter}>
          <option value="all" selected>
            All
          </option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="sort">
        <label>Sort</label>
        <select id="sort" name="sort">
          <option value="added-date-asc" selected>
            Added date
          </option>
          <option value="due-date-desc">Due date</option>
        </select>
        <i className="fas fa-sort-amount-down-alt" data-title="Ascending" />
      </div>
    </div>
  );
};
export default ViewOptions;
