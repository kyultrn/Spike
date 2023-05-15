import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Pagination.css";

export default function Pagination ({
    pageNumber,
    setPageNumber,
    totalPages
}) {
    return (
        <div className="pagination">
            <div className="row pagination__row">
                <button
                    className={`pagination__button pointer ${
                        pageNumber === 1 && "disabled"
                    }`}
                    onClick={
                        pageNumber > 1
                          ? () => {
                            setPageNumber(1);
                            window.scrollTo(0,0);
                            }
                          : undefined
                    }
                >
                    <KeyboardDoubleArrowLeftIcon />
                </button>
                <ArrowBackIcon
                    className={`pagination__prev pointer ${
                        pageNumber === 1 && "disabled"
                    }`}
                    onClick={
                        pageNumber > 1
                            ? () => {
                                setPageNumber(pageNumber - 1);
                                window.scrollTo(0, 0);
                                }
                            : undefined
                    }
                />
                <div className="pagination__pages">
                    {pageNumber + 1 > totalPages && pageNumber - 4 > 0 && (
                        <p
                            className="pagination__page pointer pagination__page--hide"
                            onClick={() => {
                                setPageNumber(pageNumber - 4);
                                window.scrollTo(0, 0);
                            }}
                        >
                            {pageNumber - 4}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
