import { useState } from "react";
import css from "./CamperForm.module.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CamperForm() {
  const [comment, setComment] = useState("");
  const [isOverLimit, setIsOverLimit] = useState(false);
  const maxLength = 225;
  const [bookingDate, setBookingDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);

    if (value.length > maxLength) {
      setIsOverLimit(true);
    } else {
      setIsOverLimit(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isOverLimit) {
      iziToast.error({
        title: "Error",
        message: "Your comment exceeds the character limit!",
        position: "topRight",
      });
      return;
    }

    iziToast.success({
      title: "Success",
      message: "Form submitted successfully!",
      position: "topRight",
    });

    setComment("");
    setBookingDate("");
    e.target.reset();
  };

  const handleDateChange = (date) => {
    if (date) {
      const formatted = date
        ? `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`
        : "";
      setBookingDate(formatted);
      setShowDatePicker(false);
    }
  };

  const handleDateInput = (e) => {
    setBookingDate(e.target.value);
  };

  return (
    <div className={css.formContainer}>
      <h3>Book your campervan now</h3>
      <p className={css.formText}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            required
            className={css.input}
          />
        </label>
        <label className={css.label}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            required
            className={css.input}
          />
        </label>
        <label className={css.label} style={{ position: "relative" }}>
          <input
            type="text"
            name="date"
            placeholder="Booking date*"
            required
            className={css.input}
            value={bookingDate}
            onChange={handleDateInput}
            onFocus={() => setShowDatePicker(true)}
            autoComplete="off"
          />
          {showDatePicker && (
            <div
              style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}
            >
              <DatePicker
                selected={
                  bookingDate && bookingDate.match(/^\d{2}\.\d{2}\.\d{4}$/)
                    ? new Date(
                        bookingDate.split(".")[2],
                        bookingDate.split(".")[1] - 1,
                        bookingDate.split(".")[0],
                      )
                    : null
                }
                onChange={handleDateChange}
                dateFormat="dd.MM.yyyy"
                inline
                onClickOutside={() => setShowDatePicker(false)}
              />
            </div>
          )}
        </label>
        <label className={css.label}>
          <textarea
            name="comment"
            placeholder="Comment"
            className={css.textarea}
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
          <div className={`${css.charCount} ${isOverLimit ? css.error : ""}`}>
            {comment.length}/{maxLength}
          </div>
        </label>
        <div className={css.sendButtonContainer}>
          <button
            className={css.sendButton}
            type="submit"
            disabled={isOverLimit}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
