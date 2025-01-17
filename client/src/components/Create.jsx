import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPokemon, getTypes} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./Create.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!input.hp || isNaN(input.hp)) {
    errors.hp = "HP is required";
  } else if (!input.attack || isNaN(input.attack)) {
    errors.attack = "Attack is required";
  } else if (!input.defense || isNaN(input.defense)) {
    errors.defense = "Defense is required";
  } else if (!input.speed || isNaN(input.speed)) {
    errors.speed = "Speed is required";
  } else if (!input.height || isNaN(input.height)) {
    errors.height = "Height is required";
  } else if (!input.weight || isNaN(input.weight)) {
    errors.weight = "Weight is required";
  } else if (!input.type) {
    errors.type = "Type is required";
  }
  return errors;
}

const eliminarSeleccion = (input, sel) => {
  if (input.includes(sel)) {
    const array1 = input.filter((num) => num !== sel);
    return array1;
  } else {
    const array2 = input.concat(sel);
    return array2;
  }
};

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const types = useSelector((state) => state.types);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    //esto es lo que necesitará el post
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/509.svg",
    type: [],
  });

  function handleType(event) {
    setInput({
      ...input,
      type: eliminarSeleccion(input.type, event.target.value),
    });
  }

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
    //console.log(input, "desde handlechange22222");
  }

  function handleSubmit(event) {
    event.preventDefault();
    //console.log(input, 'handlesubmit1111');
    dispatch(createPokemon(input));
    alert("Pokemon created");
    setInput({
      name: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      image: "",
      type: [],
    });
    navigate('/home')
  }

  useEffect(() => {
    dispatch(getTypes());
  },[dispatch]);

  return (
    <div className="encierra">
      <div>
        <Link className="borrar" to="/home">
          <button className="botonformu">Back</button>
        </Link>
      </div>
      <div>
        <h1 className="title-form">Create your Pokemon</h1>
      </div>

      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-container">
          <div className="llenar">
            <div className="campo">
              <label className="label">Name</label>
              <input
                className="input-buscar"
                type="text"
                value={input.name}
                name="name"
                onChange={(event) => handleChange(event)}
              />
              {errors.name && <p className= 'errores'>{errors.name}</p>}
            </div>
            <div className="campo">
              <label className="label">HP</label>
              <input
                className="input-buscar"
                type="number"
                value={input.hp}
                name="hp"
                onChange={(event) => handleChange(event)}
              />
              {errors.hp && <p className= 'errores'>{errors.hp}</p>}
            </div>
            <div className="campo">
              <label className="label">Attack</label>
              <input
                className="input-buscar"
                type="number"
                value={input.attack}
                name="attack"
                onChange={(event) => handleChange(event)}
              />
              {errors.attack && <p className= 'errores'>{errors.attack}</p>}
            </div>
            <div className="campo">
              <label className="label">Defense</label>
              <input
                className="input-buscar"
                type="number"
                value={input.defense}
                name="defense"
                onChange={(event) => handleChange(event)}
              />
              {errors.defense && <p className= 'errores'>{errors.defense}</p>}
            </div>
            <div className="campo">
              <label className="label">Speed</label>
              <input
                className="input-buscar"
                type="number"
                value={input.speed}
                name="speed"
                onChange={(event) => handleChange(event)}
              />
              {errors.speed && <p className= 'errores'>{errors.speed}</p>}
            </div>
            <div className="campo">
              <label className="label">Height</label>
              <input
                className="input-buscar"
                type="number"
                value={input.height}
                name="height"
                onChange={(event) => handleChange(event)}
              />
              {errors.height && <p className= 'errores'>{errors.height}</p>}
            </div>
            <div className="campo">
              <label className="label">Weight</label>
              <input
                className="input-buscar"
                type="number"
                value={input.weight}
                name="weight"
                onChange={(event) => handleChange(event)}
              />
              {errors.weight && <p className= 'errores'>{errors.weight}</p>}
            </div>
            <div className="campo">
              <label className="label">Image</label>
              <input
                className="input-buscar"
                type="url"
                value={input.image}
                name="image"
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>
          <div className="chekes">
            <div className="type-form">
              {types.map((t) => (
                <div key={t.id}className="checkbox-types">
                  <div className="check">
                    <input
                      
                      type="checkbox"
                      value={t.id}
                      onChange={(event) => handleType(event)}
                    />
                    {t.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="boton-mandar" type="submit">
            Create
          </button>
        </div>
      </form>

      {/*console.log(input, 'desde pokemoncreate')*/}
    </div>
  );
}
