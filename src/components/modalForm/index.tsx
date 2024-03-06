"use client";

import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import './style.css'
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { MdOutlineFastfood } from "react-icons/md";
import { CategoryInput } from "../categoryInput";
import { CalendarInput } from "../calendar/calendarInput";
import { format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalForm: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [type, setType] = useState<"income" | "expense">("income");

  const [date, setDate] = useState<Date>(new Date);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [money, setMoney] = useState<number>(0) //it should be [amount, setAmount], but im not gonna change the prisma anymore (for this project)

  const MAX_CHARACTERS = 20;
  const [nameCounter, setNameCounter] = useState<number>(0);

  const ref = useOutsideClick(onClose);

  const INCOME_OPTIONS = [
    {display: "Allowance", value: "allowance", icon: <MdOutlineFastfood />},
    {display: "Bonus", value: "bonus", icon: <MdOutlineFastfood />},
    {display: "Salary", value: "salary", icon: <MdOutlineFastfood />},
    {display: "other", value: "other", icon: <MdOutlineFastfood />},
  ]
  const EXPENSE_OPTIONS = [
    {display: "Education", value: "education", icon: <MdOutlineFastfood />},
    {display: "Fashion", value: "fashion", icon: <MdOutlineFastfood />},
    {display: "Food", value: "food", icon: <MdOutlineFastfood />},
    {display: "Household", value: "household", icon: <MdOutlineFastfood />},
    {display: "Transport", value: "transport", icon: <MdOutlineFastfood />},
    {display: "other", value: "other", icon: <MdOutlineFastfood />},
  ]

  const handleInputChange = (value: string) => {
    if (value.length <= MAX_CHARACTERS) {
      setNameCounter(value.length)
      setName(value);
    } else {
        const truncatedValue = value.slice(0, MAX_CHARACTERS);
        setNameCounter(MAX_CHARACTERS);
        setName(truncatedValue);
    }
  };

  const addTransaction = async() => {
    if (!date || !name || !type || !category || !money) {
      console.error("All fields must be filled out");
      return;
    }

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          name: name,
          type: type,
          category: category,
          money: money
        })
      })
    } catch (error: any) {

    }
  }

  useEffect(() => {
    setName("");
    setMoney(0);
  }, [type])

  return (
    <div className={`fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex flex-col w-[90%] md:w-3/5 lg:w-2/5 max-h-[90%] min-w-[360px] bg-stonks-000 rounded-xl sm:p-3 lg:p-6" ref={ref}>
        <div className="flex justify-end mr-3 mt-3 lg:mt-0 lg:mr-0">
          <button className="hover:bg-stonks-100 hover:text-stonks-600 p-2 rounded-[6px] text-[22px]" onClick={onClose}>
            <HiOutlineX />
          </button>
        </div>

        <div className="flex flex-col gap-[20px] lg:gap-[30px]">
          <nav className="flex justify-center items-center">
            <div className="flex flex-row text-[14px] w-2/3">
              <div
                className={`chip to-left ${type == "income" ? "active-to-right border-r-0 text-stonks-000" : "active-to-left  border-r-0 text-[#000033]"} border-stonks-300 px-[18px] py-1 rounded-l-lg border-[2px] text-center`}
                onClick={() => setType("income")}
              >
                <text>Income</text>
              </div>

              <div
                className={`chip to-right ${type == "expense" ? "active-to-left border-l-0 text-stonks-000" : "active-to-right  border-l-0 text-[#000033]"} border-stonks-300 px-[18px] py-1 rounded-r-lg border-[2px] text-center`}
                onClick={() => setType("expense")}
              >
                <text>Expense</text>
              </div>
            </div>
          </nav>

          <section className="flex flex-col px-[45px] gap-[20px] lg:gap-[25px] text-[#000030]">
            <div>
              <text className="text-[12px] lg:text-[14px]">Date</text>
              <CalendarInput input={date} setInput={setDate}/>
            </div>
            
            <div className="flex flex-col">
              <text className="text-[12px] lg:text-[14px]">Transaction Name</text>
              <input className="px-3 py-[6px] border-[2px] border-stonks-800 rounded-md bg-stonks-000 lg:text-[16px] text-[14px]" onChange={(e) => handleInputChange(e.target.value)} value={name.length <= MAX_CHARACTERS ? name : name.slice(0, MAX_CHARACTERS)} placeholder="Transaction name"/>
              
              <section className="flex flex-row justify-between text-[10px] font-[525]">
                <text className="text-danger-100">Transaction name must be 20 characters or less</text>
                <text className={`${nameCounter == MAX_CHARACTERS && 'text-danger-100 font-semibold'}`}>{nameCounter}/{MAX_CHARACTERS}</text>
            </section>
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-col w-[55%]">
                <text className="text-[12px] lg:text-[14px]">Category</text>
                <CategoryInput
                  type={type}
                  dropdownValue={category}
                  setDropdownValue={setCategory}
                  options={type == "income" ? INCOME_OPTIONS : EXPENSE_OPTIONS}
                />
              </div>  

              <div className="flex flex-col w-[45%]"> {/*hold up to 9 digits in full screen display :)*/}
                <text className="text-[12px] lg:text-[14px]">Amount</text>
                <input className="px-3 py-[6px] text-[16px] border-[2px] border-[#00001d] rounded-md bg-stonks-000" type="number" min={1} onChange={(e) => setMoney(parseInt(e.target.value))} placeholder="Amount"/>
              </div>
            </div>
          </section>

          <div className="flex justify-center my-2 mb-7 lg:mb-3 px-[45px]">
            <button className="bg-[#1a53a4] text-stonks-000 px-5 py-[7px] rounded-lg text-[14px] lg:text-[16px] w-full" onClick={() => { onClose(); addTransaction(); }}>Add Transaction</button>
          </div>
        </div>
      </div>
    </div>
  );
};