type Props = {
  income: number;
  expense: number;
};

export default function SummaryCards({ income, expense }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-400 p-4 rounded-xl">
        <p className="text-sm font-medium text-slate-700">Орлого</p>
        <p className="text-xl font-bold text-green-700">
          {income.toLocaleString()}₮
        </p>
      </div>

      <div className="bg-red-400 p-4 rounded-xl">
        <p className="text-sm">Зарлага</p>
        <p className="text-xl font-bold text-red-700">
          {expense.toLocaleString()}₮
        </p>
      </div>

      <div className="bg-gray-400 p-4 rounded-xl">
        <p className="text-sm">Үлдэгдэл</p>
        <p className="text-xl font-bold">
          {(income - expense).toLocaleString()}₮
        </p>
      </div>
    </div>
  );
}
