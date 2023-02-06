import { useState } from "react";
import { useDispatch } from 'react-redux';
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

    return (
        <form 
            className="border p-4 shadow-lg rounded"
            onSubmit={createHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => {
                        setElement(e.target.value);
                    }}>
                    <option disabled value="">Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;