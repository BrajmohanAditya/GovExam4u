import { collapseClasses } from "@mui/material";



export const AddCardStyle = {
  mock_card: ` 
    max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg mb-10;
  `,

  h3: `
    text-xl font-semibold mb-4 text-gray-800 text-center
  `,


  row: `
    grid gap-5
  `,
};



export const MockCardStyle = {
  cardContainer: `
    w-full 
    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
    gap-6 
    p-4
    max-w-[1200px]
    mx-auto
  `,

  card: `
    bg-white
    border border-gray-200
    rounded-xl
    shadow-sm
    p-5
    flex
    flex-col
    gap-3
    hover:shadow-md
    transition
  `,

  title: `
    text-2xl
    font-semibold
    text-gray-900
  `,

  subtitle: `
    text-lg
    text-gray-600
  `,

  link: `
    text-blue-600
    text-sm
    font-medium
    hover:underline
    cursor-pointer
  `,

  lastDate: `
    text-sm
    text-red-700
    border-t
    pt-3
    mt-2
  `,
};
