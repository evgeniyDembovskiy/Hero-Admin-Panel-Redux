import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as createId } from 'uuid';
import { heroCreate } from "../../actions";
import { useHttp } from './../../hooks/http.hook';


const HeroesAddForm = () => {

    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [element, setElement] = useState("");

    const dispatch = useDispatch();
    const {request} = useHttp();

    const createHero = (e) => {
        e.preventDefault();
        const hero = {
            name,
            description: text,
            element,
            id: createId(),
        }
        dispatch(heroCreate(hero));
        request("http://localhost:3001/heroes", "POST", JSON.stringify(hero));
        setName("");
        setText("");
        setElement("");
    }

    const createElementOptions = (filters) => filters.filter(item => item !== "All").map(item => <option key={item} value={item}>{item}</option>); // Убираем опцию "All" и возвращаем jsx оставшихся опций
    

    const filters = useSelector(state => state.filters);
    const elementOptions = useMemo(() => createElementOptions(filters), [filters]);

    return (
        <form 
            className="border p-4 shadow-lg rounded"
            onSubmit={createHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Name of the new hero</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Name is..."
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What kind of abilities do I have?"
                    style={{"height": '130px'}}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Select hero element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => {
                        setElement(e.target.value);
                    }}>
                    <option disabled value="">Element...</option>
                    {elementOptions}
                    {/* <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="wind">Wind</option>
                    <option value="earth">Earth</option> */}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;