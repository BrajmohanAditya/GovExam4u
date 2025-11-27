import { collapseClasses } from "@mui/material";

export const MockCardStyle = {
  cardContainer: `
    m-5 md:m-15 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-md bg-red-200
  `,
  card: `
    bg-gradient-to-r from-teal-400 to-emerald-500
    rounded-xl p-5 w-full card-wrapper
  `,
};

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
