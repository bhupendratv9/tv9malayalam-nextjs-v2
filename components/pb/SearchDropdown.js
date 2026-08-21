"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

function normalizeValue(value) {
  return String(value || "").trim().toLowerCase();
}

export default function SearchDropdown({
  items = [],
  placeholder = "Search",
  inputId,
  inputName,
  inputClassName = "",
  resultsClassName = "",
  maxResults = 8,
  getSearchText,
  getItemKey,
  getItemHref,
  renderItem,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const normalizedQuery = normalizeValue(query);

  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return items
      .filter((item) => normalizeValue(getSearchText(item)).includes(normalizedQuery))
      .slice(0, maxResults);
  }, [getSearchText, items, maxResults, normalizedQuery]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="search-dropdown" ref={wrapperRef}>
      <input
        autoComplete="off"
        placeholder={placeholder}
        type="text"
        id={inputId}
        name={inputName}
        className={inputClassName}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (normalizedQuery) {
            setIsOpen(true);
          }
        }}
      />
      <div
        className={resultsClassName}
        hidden={!isOpen || !results.length}
        aria-label="Search city results"
      >
        {results.map((item) => (
          <a
            key={getItemKey(item)}
            href={getItemHref(item)}
            className="search-dropdown__item"
            onClick={() => setIsOpen(false)}
          >
            {renderItem(item)}
          </a>
        ))}
      </div>
    </div>
  );
}

SearchDropdown.propTypes = {
  items: PropTypes.array,
  placeholder: PropTypes.string,
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  inputClassName: PropTypes.string,
  resultsClassName: PropTypes.string,
  maxResults: PropTypes.number,
  getSearchText: PropTypes.func.isRequired,
  getItemKey: PropTypes.func.isRequired,
  getItemHref: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};
