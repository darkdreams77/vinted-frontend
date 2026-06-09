import { useEffect, useState } from "react";
import { getTrackBackground, Range as RangeUX } from "react-range";
import { cn } from "../../helpers/cn";
import { formatEuro } from "../../helpers/formatCurrency";
import { useSearchParams } from "react-router-dom";

const STEP = 1;
const MIN = 0;
const MAX = 500;
const INITIAL = [25, 150];

type RangeProps = {
  label: string;
};

const getRangeValuesFromParams = (searchParams: URLSearchParams) => {
  const priceMin = Number(searchParams.get("priceMin"));
  const priceMax = Number(searchParams.get("priceMax"));

  return [
    Number.isFinite(priceMin) ? priceMin : INITIAL[0],
    Number.isFinite(priceMax) ? priceMax : INITIAL[1],
  ];
};

export const Range = ({ label }: RangeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [values, setValues] = useState<number[]>(() =>
    getRangeValuesFromParams(searchParams),
  );

  useEffect(() => {
    setValues(getRangeValuesFromParams(searchParams));
  }, [searchParams]);

  const handleChange = (_values: number[]) => {
    setValues(_values);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("priceMin");
    nextSearchParams.delete("priceMax");
    nextSearchParams.append("priceMin", String(_values[0]));
    nextSearchParams.append("priceMax", String(_values[1]));

    setSearchParams(nextSearchParams);
  };

  return (
    <>
      <label>{label}</label>
      <RangeUX
        label="Prix entre"
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(v) => handleChange(v)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="h-9 flex w-3/4 "
            style={{
              ...props.style,
            }}
          >
            <div
              ref={props.ref}
              className="h-1 w-full rounded-md self-center"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#007782", "#ccc"],
                  min: MIN,
                  max: MAX,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            key={props.key}
            className={cn(
              "size-4 rounded-full flex place-items-center bg-lagoon-500",
              "relative",
            )}
            style={{
              ...props.style,
            }}
          >
            <div
              className={cn(
                "absolute -top-7 text-xs -left-2/3 bg-lagoon-500 text-white p-1 rounded-sm",
              )}
            >
              {formatEuro(values[index])}
            </div>
          </div>
        )}
      />
    </>
  );
};
