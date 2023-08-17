import "./App.css";
import {useState} from "react";

const faqs = [
    {
        title: "Where are these chairs assembled?",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
        title: "How long do I have to return my chair?",
        text:
            "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
        title: "Do you ship to countries outside the EU?",
        text:
            "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
];

export default function App() {
    return (
        <div>
            <Accordion data={faqs}/>
        </div>
    );
}

function Accordion({data}) {
    const [curOpen, setCurOpen] = useState(null);

    function handleCurOpen(id) {
        if (curOpen === id) setCurOpen(null);
        if (curOpen !== id) setCurOpen(id);
    }

    return (<div className='accordion'>
        {data.map((el, index) => {
            return <AccordionItem item={el} num={index + 1} key={index} isOpen={curOpen === index} onOpen={handleCurOpen}/>
        })}
    </div>);
}

function AccordionItem({item, num, isOpen, onOpen}) {
    return (<div className={isOpen ? 'item open' : 'item'}  onClick={() => onOpen(num - 1)}>
        <p className='number'>{num < 10 ? `0${num}` : num}</p>
        <p className='title'>{item.title}</p>
        <p className='icon'>{isOpen ? `-` : `+`}</p>
        {isOpen && <div className='content-box'>{item.text}</div>}
    </div>);
}
