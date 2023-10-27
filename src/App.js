import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./App.css";

const getLSData = () => {
  let data = localStorage.getItem("recodeKeep");
  if (data) {
    console.log(JSON.parse(data));
    return JSON.parse(data);
  } else {
    return [];
  }
};
const App = () => {
  const [itemList, setItemList] = useState(getLSData());
  const [item, setItem] = useState({ id: "", name: "", email: "" });
  const [toggel, setToggel] = useState(false);
  const [deletedID, setDeletedID] = useState(null);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    console.log(value);
    const ItemId = new Date().getTime().toString();
    setItem((preData) => {
      return {
        ...preData,
        id: ItemId,
        [name]: value,
      };
    });
  };

  const createItem = (e) => {
    e.preventDefault();
    if (!item.name || !item.email) {
      alert("Enter valid data");
    } else if ((item.name || item.email) && toggel) {
      itemList.map((elem) => {
        if (elem.id === deletedID) {
          elem.name = item.name;
          elem.email = item.email;
        }
      });
      setItem({ id: "", name: "", email: "" });
      setToggel(false);
      setDeletedID(null);
    } else {
      setItemList((preData) => {
        return [...preData, item];
      });
      setItem({
        id: "",
        name: "",
        email: "",
      });
    }
  };

  const delItem = (id) => {
    setItemList((preData) => {
      return preData.filter((elem) => {
        return elem.id !== id;
      });
    });
  };

  const editItem = (ItemId) => {
    setToggel(true);
    const deletedItem = itemList.find((elem) => {
      return elem.id === ItemId;
    });
    const { id, name, email } = deletedItem;
    setItem({ id: [id], name: [name], email: [email] });
    setToggel(true);
    setDeletedID(ItemId);
  };
  useEffect(() => {
    localStorage.setItem("recodeKeep", JSON.stringify(itemList));
  }, [itemList, toggel]);

  return (
    <>
      <div className="body">
        <form onSubmit={createItem}>
          <input
            type="text"
            onChange={inputEvent}
            name="name"
            placeholder="Enter Name"
            value={item.name}
          />
          <input
            type="text"
            onChange={inputEvent}
            value={item.email}
            name="email"
            placeholder="Enter Email"
          />
          {toggel ? (
            <button type="submit">Edit</button>
          ) : (
            <button type="submit">Create</button>
          )}
        </form>
        <div className="tabel">
          <div className="row">
            <p className="hd name">Name</p>
            <p className="hd email">Email</p>
            <p className="hd action">Action</p>
          </div>
          {itemList.map((elem, ind) => {
            return (
              <div className="row" key={ind}>
                <p className="name">{elem.name}</p>
                <p className="email">{elem.email}</p>
                <div className="icons">
                  <EditIcon
                    onClick={() => {
                      editItem(elem.id);
                    }}
                    className="icon"
                  />
                  <DeleteIcon
                    onClick={() => {
                      delItem(elem.id);
                    }}
                    className="icon"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
