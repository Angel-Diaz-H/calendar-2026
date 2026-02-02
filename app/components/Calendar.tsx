import React from "react";

export const Calendar = () => {
  const year = 2026;

  const months = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];

  const getDaysArray = (year: number, monthIndex: number) => {
    // 1 de Enero 2026 es Jueves (4 en JS getDay)
    const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    // Ajuste para empezar en Lunes:
    // Domingo (0) -> 6
    // Lunes (1) -> 0
    // ... Jueves (4) -> 3
    const startingSlot = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const daysArray: (number | null)[] = [];

    // Espacios vacíos antes del 1
    for (let i = 0; i < startingSlot; i++) {
      daysArray.push(null);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }

    return daysArray;
  };

  return (
    <div className="  w-full text-2xl ">
      {/* Contenedor principal de los meses */}
      <div className="grid grid-cols-6 justify-center gap-8 ">
        {months.map((monthName, monthIndex) => {
          const days = getDaysArray(year, monthIndex);

          return (
            <div
              key={monthName}
              // IMPORTANTE: min-w-[300px] evita que la grilla se rompa si la pantalla es pequeña
              className="border  border-zinc-200 rounded-xl p-4 shadow-sm "
            >
              {/* Título */}
              <h3 className="text-center font-bold text-3xl mb-1 text-black">
                {monthName}
              </h3>

              {/* GRID ÚNICO DE 7 COLUMNAS */}
              <div className="grid grid-cols-7 space-x-0 gap-x-0    text-center w-full">
                {/* 1. Renderizamos los Encabezados (L M M J V S D) */}
                {weekDays.map((day, i) => (
                  <div
                    // Usamos el índice y el mes para que la key sea 100% única
                    key={`header-${monthName}-${i}`}
                    className="font-bold text-zinc-900 items-center mb-2"
                  >
                    {day}
                  </div>
                ))}

                {/* 2. Renderizamos los Días */}
                {days.map((day, i) => (
                  <div
                    key={`day-${monthName}-${i}`}
                    className={`flex  items-center justify-center   ${
                      day ? "text-zinc-700 font-medium" : ""
                    }`}
                  >
                    {day || ""}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
