import React, { useState } from "react";
import { motion } from "motion/react";
import './globals.css';

type searchProps = {
    description : string;
    disabled : boolean;
    filterOptions : (...args:any[]) => any;
    label : string;
    loading : boolean;
    multiple : boolean;
    onChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInputChange : (...args:any[]) => any;
    options : any[];
    placeholder : string;
    renderOption : (...args:any[]) => any;
    value : any | any[];
}

export default function Search(props : searchProps) {
    const [asyncInput, setAsyncInput] = useState("");
    const [syncInput, setSyncInput] = useState("");
    const [filteredAsync, setFilteredAsync] = useState<any[]>([]);
    const [filteredSync, setFilteredSync] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSyncOpen, setIsSyncOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedSync, setIsFocusedSync] = useState(false);

    //Async search useEffect
    React.useEffect(() => {
        if (asyncInput.trim() === "") {
            setFilteredAsync([]);
            setIsOpen(false);
            return;
        }
        const getData = setTimeout(() => {
            const results = props.options.filter((o) => 
                o.toLowerCase().includes(asyncInput.toLowerCase())
            );
            console.log(results);
            setFilteredAsync(results);
            setIsOpen(true);
        }, 1000)

        return () => clearTimeout(getData)
    }, [asyncInput])

    //Synchronous search useEffect
    React.useEffect(() => {
        if (syncInput.trim() === "") {
            setFilteredSync([]);
            setIsSyncOpen(false);
        } else {
            const results = props.options.filter((option) =>
                option.toLowerCase().includes(syncInput.toLowerCase())
            );
            setFilteredSync(results);
            setIsSyncOpen(true);
        }
    }, [syncInput]);

    const handleOptionSelect = (option:any) => {
        if (selectedOptions.includes(option)) {
          setSelectedOptions(selectedOptions.filter((o) => o !== option));
        } else {
          setSelectedOptions([...selectedOptions, option]);
        }
      };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }} className="w-full h-auto max-w-md border bg-gray-300 rounded-lg text-black flex flex-col items-center p-4">
            <label className="block text-4xl text-black font-bold mb-1">{props.label}</label>
            <div className="async-search relative">
                <p className="text-sm">Async search</p>
                <input type="text" className={`bg-gray-700 rounded-md text-gray-300 p-2 w-full border-2 ${isFocused? 'input-focused' : 'border-transparent'} focus:outline-none` } value={asyncInput} 
                onChange={(e) => setAsyncInput(e.target.value)}
                placeholder={props.placeholder} disabled={props.disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}/>
                {isOpen && (
                    <ul className="absolute z-10 text-white bg-gray-700 border border-gray-700 rounded-md shadow-md w-full max-h-60 overflow-auto transform transition-transform duration-300 origin-top mt-1">
                        {filteredAsync.length > 0 ? (
                        filteredAsync.map((option, index) => (
                            <li
                            key={index}
                            className="p-2 hover:bg-gray-800 cursor-pointer flex items-center"
                            onClick={() => handleOptionSelect(option)}
                            >
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option)}
                                onChange={() => handleOptionSelect(option)}
                                className="mr-2"
                            />
                            {option}
                            </li>
                        ))
                        ) : (
                        <li className="p-2 text-center text-white">
                            No options to be shown
                        </li>
                        )}
                    </ul>
                    )}
                <p className="text-sm text-gray-500 pt-4">{props.description}</p>
            </div>
            <div className="sync-search pt-10 relative">
                <p className="text-sm">Sync search</p>
                <input className={`bg-gray-700 rounded-md w-full text-gray-300 p-2
                border-2 ${isFocusedSync? 'input-focused' : 'border-transparent'} focus:outline-none`} 
                type="text" value={syncInput} onChange={e => setSyncInput(e.target.value)}
                placeholder={props.placeholder} disabled={props.disabled}
                onFocus={() => setIsFocusedSync(true)}
                onBlur={() => setIsFocusedSync(false)}/>
                {isSyncOpen && (
                    <ul className="absolute z-10 text-white bg-gray-700 border border-gray-700 rounded-md shadow-md w-full max-h-60 overflow-auto transform transition-transform duration-300 origin-top mt-1">
                        {filteredSync.length > 0 ? (
                            filteredSync.map((option, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-800 cursor-pointer flex items-center"
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option)}
                                        onChange={() => handleOptionSelect(option)}
                                        className="mr-2"
                                    />
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-center text-white">
                                No options to be shown
                            </li>
                        )}
                    </ul>
                )}
                <p className="text-sm text-gray-500 pt-4">{props.description}</p>
            </div>
        </motion.div>
    );

}
