import * as tslib_1 from "tslib";
import { Observable } from "@babylonjs/core/Misc/observable";
import { ClipboardEventTypes } from "@babylonjs/core/Events/clipboardEvents";
import { PointerEventTypes } from "@babylonjs/core/Events/pointerEvents";
import { Control } from "./control";
import { ValueAndUnit } from "../valueAndUnit";
/**
 * Class used to create input text control
 */
var InputText = /** @class */ (function(_super) {
  tslib_1.__extends(InputText, _super);
  /**
   * Creates a new InputText
   * @param name defines the control name
   * @param text defines the text of the control
   */
  function InputText(name, text) {
    if (text === void 0) {
      text = "";
    }
    var _this = _super.call(this, name) || this;
    _this.name = name;
    _this._text = "";
    _this._placeholderText = "";
    _this._background = "#222222";
    _this._focusedBackground = "#000000";
    _this._focusedColor = "white";
    _this._placeholderColor = "gray";
    _this._thickness = 1;
    _this._margin = new ValueAndUnit(10, ValueAndUnit.UNITMODE_PIXEL);
    _this._autoStretchWidth = true;
    _this._maxWidth = new ValueAndUnit(
      1,
      ValueAndUnit.UNITMODE_PERCENTAGE,
      false
    );
    _this._isFocused = false;
    _this._blinkIsEven = false;
    _this._cursorOffset = 0;
    _this._deadKey = false;
    _this._addKey = true;
    _this._currentKey = "";
    _this._isTextHighlightOn = false;
    _this._textHighlightColor = "#d5e0ff";
    _this._highligherOpacity = 0.4;
    _this._highlightedText = "";
    _this._startHighlightIndex = 0;
    _this._endHighlightIndex = 0;
    _this._cursorIndex = -1;
    _this._onFocusSelectAll = false;
    _this._isPointerDown = false;
    /** Gets or sets a string representing the message displayed on mobile when the control gets the focus */
    _this.promptMessage = "Please enter text:";
    /** Observable raised when the text changes */
    _this.onTextChangedObservable = new Observable();
    /** Observable raised just before an entered character is to be added */
    _this.onBeforeKeyAddObservable = new Observable();
    /** Observable raised when the control gets the focus */
    _this.onFocusObservable = new Observable();
    /** Observable raised when the control loses the focus */
    _this.onBlurObservable = new Observable();
    /**Observable raised when the text is highlighted */
    _this.onTextHighlightObservable = new Observable();
    /**Observable raised when copy event is triggered */
    _this.onTextCopyObservable = new Observable();
    /** Observable raised when cut event is triggered */
    _this.onTextCutObservable = new Observable();
    /** Observable raised when paste event is triggered */
    _this.onTextPasteObservable = new Observable();
    /** Observable raised when a key event was processed */
    _this.onKeyboardEventProcessedObservable = new Observable();
    _this.text = text;
    _this.isPointerBlocker = true;
    return _this;
  }
  Object.defineProperty(InputText.prototype, "maxWidth", {
    /** Gets or sets the maximum width allowed by the control */
    get: function() {
      return this._maxWidth.toString(this._host);
    },
    set: function(value) {
      if (this._maxWidth.toString(this._host) === value) {
        return;
      }
      if (this._maxWidth.fromString(value)) {
        this._markAsDirty();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "maxWidthInPixels", {
    /** Gets the maximum width allowed by the control in pixels */
    get: function() {
      return this._maxWidth.getValueInPixel(
        this._host,
        this._cachedParentMeasure.width
      );
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "highligherOpacity", {
    /** Gets or sets the text highlighter transparency; default: 0.4 */
    get: function() {
      return this._highligherOpacity;
    },
    set: function(value) {
      if (this._highligherOpacity === value) {
        return;
      }
      this._highligherOpacity = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "onFocusSelectAll", {
    /** Gets or sets a boolean indicating whether to select complete text by default on input focus */
    get: function() {
      return this._onFocusSelectAll;
    },
    set: function(value) {
      if (this._onFocusSelectAll === value) {
        return;
      }
      this._onFocusSelectAll = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "textHighlightColor", {
    /** Gets or sets the text hightlight color */
    get: function() {
      return this._textHighlightColor;
    },
    set: function(value) {
      if (this._textHighlightColor === value) {
        return;
      }
      this._textHighlightColor = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "margin", {
    /** Gets or sets control margin */
    get: function() {
      return this._margin.toString(this._host);
    },
    set: function(value) {
      if (this._margin.toString(this._host) === value) {
        return;
      }
      if (this._margin.fromString(value)) {
        this._markAsDirty();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "marginInPixels", {
    /** Gets control margin in pixels */
    get: function() {
      return this._margin.getValueInPixel(
        this._host,
        this._cachedParentMeasure.width
      );
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "autoStretchWidth", {
    /** Gets or sets a boolean indicating if the control can auto stretch its width to adapt to the text */
    get: function() {
      return this._autoStretchWidth;
    },
    set: function(value) {
      if (this._autoStretchWidth === value) {
        return;
      }
      this._autoStretchWidth = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "thickness", {
    /** Gets or sets border thickness */
    get: function() {
      return this._thickness;
    },
    set: function(value) {
      if (this._thickness === value) {
        return;
      }
      this._thickness = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "focusedBackground", {
    /** Gets or sets the background color when focused */
    get: function() {
      return this._focusedBackground;
    },
    set: function(value) {
      if (this._focusedBackground === value) {
        return;
      }
      this._focusedBackground = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "focusedColor", {
    /** Gets or sets the background color when focused */
    get: function() {
      return this._focusedColor;
    },
    set: function(value) {
      if (this._focusedColor === value) {
        return;
      }
      this._focusedColor = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "background", {
    /** Gets or sets the background color */
    get: function() {
      return this._background;
    },
    set: function(value) {
      if (this._background === value) {
        return;
      }
      this._background = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "placeholderColor", {
    /** Gets or sets the placeholder color */
    get: function() {
      return this._placeholderColor;
    },
    set: function(value) {
      if (this._placeholderColor === value) {
        return;
      }
      this._placeholderColor = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "placeholderText", {
    /** Gets or sets the text displayed when the control is empty */
    get: function() {
      return this._placeholderText;
    },
    set: function(value) {
      if (this._placeholderText === value) {
        return;
      }
      this._placeholderText = value;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "deadKey", {
    /** Gets or sets the dead key flag */
    get: function() {
      return this._deadKey;
    },
    set: function(flag) {
      this._deadKey = flag;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "highlightedText", {
    /** Gets or sets the highlight text */
    get: function() {
      return this._highlightedText;
    },
    set: function(text) {
      if (this._highlightedText === text) {
        return;
      }
      this._highlightedText = text;
      this._markAsDirty();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "addKey", {
    /** Gets or sets if the current key should be added */
    get: function() {
      return this._addKey;
    },
    set: function(flag) {
      this._addKey = flag;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "currentKey", {
    /** Gets or sets the value of the current key being entered */
    get: function() {
      return this._currentKey;
    },
    set: function(key) {
      this._currentKey = key;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "text", {
    /** Gets or sets the text displayed in the control */
    get: function() {
      return this._text;
    },
    set: function(value) {
      var valueAsString = value.toString(); // Forcing convertion
      if (this._text === valueAsString) {
        return;
      }
      this._text = valueAsString;
      this._markAsDirty();
      this.onTextChangedObservable.notifyObservers(this);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(InputText.prototype, "width", {
    /** Gets or sets control width */
    get: function() {
      return this._width.toString(this._host);
    },
    set: function(value) {
      if (this._width.toString(this._host) === value) {
        return;
      }
      if (this._width.fromString(value)) {
        this._markAsDirty();
      }
      this.autoStretchWidth = false;
    },
    enumerable: true,
    configurable: true
  });
  /** @hidden */
  InputText.prototype.onBlur = function() {
    this._isFocused = false;
    this._scrollLeft = null;
    this._cursorOffset = 0;
    clearTimeout(this._blinkTimeout);
    this._markAsDirty();
    this.onBlurObservable.notifyObservers(this);
    this._host.unRegisterClipboardEvents();
    if (this._onClipboardObserver) {
      this._host.onClipboardObservable.remove(this._onClipboardObserver);
    }
    var scene = this._host.getScene();
    if (this._onPointerDblTapObserver && scene) {
      scene.onPointerObservable.remove(this._onPointerDblTapObserver);
    }
  };
  /** @hidden */
  InputText.prototype.onFocus = function() {
    var _this = this;
    if (!this._isEnabled) {
      return;
    }
    this._scrollLeft = null;
    this._isFocused = true;
    this._blinkIsEven = false;
    this._cursorOffset = 0;
    this._markAsDirty();
    this.onFocusObservable.notifyObservers(this);
    // if (navigator.userAgent.indexOf("Mobile") !== -1) {
    //   var value = prompt(this.promptMessage);
    //   if (value !== null) {
    //     this.text = value;
    //   }
    //   this._host.focusedControl = null;
    //   return;
    // }
    this._host.registerClipboardEvents();
    this._onClipboardObserver = this._host.onClipboardObservable.add(function(
      clipboardInfo
    ) {
      // process clipboard event, can be configured.
      switch (clipboardInfo.type) {
        case ClipboardEventTypes.COPY:
          _this._onCopyText(clipboardInfo.event);
          _this.onTextCopyObservable.notifyObservers(_this);
          break;
        case ClipboardEventTypes.CUT:
          _this._onCutText(clipboardInfo.event);
          _this.onTextCutObservable.notifyObservers(_this);
          break;
        case ClipboardEventTypes.PASTE:
          _this._onPasteText(clipboardInfo.event);
          _this.onTextPasteObservable.notifyObservers(_this);
          break;
        default:
          return;
      }
    });
    var scene = this._host.getScene();
    if (scene) {
      //register the pointer double tap event
      this._onPointerDblTapObserver = scene.onPointerObservable.add(function(
        pointerInfo
      ) {
        if (!_this._isFocused) {
          return;
        }
        if (pointerInfo.type === PointerEventTypes.POINTERDOUBLETAP) {
          _this._processDblClick(pointerInfo);
        }
      });
    }
    if (this._onFocusSelectAll) {
      this._selectAllText();
    }
  };
  InputText.prototype._getTypeName = function() {
    return "InputText";
  };
  /**
   * Function called to get the list of controls that should not steal the focus from this control
   * @returns an array of controls
   */
  InputText.prototype.keepsFocusWith = function() {
    if (!this._connectedVirtualKeyboard) {
      return null;
    }
    return [this._connectedVirtualKeyboard];
  };
  /** @hidden */
  InputText.prototype.processKey = function(keyCode, key, evt) {
    //return if clipboard event keys (i.e -ctr/cmd + c,v,x)
    if (
      evt &&
      (evt.ctrlKey || evt.metaKey) &&
      (keyCode === 67 || keyCode === 86 || keyCode === 88)
    ) {
      return;
    }
    //select all
    if (evt && (evt.ctrlKey || evt.metaKey) && keyCode === 65) {
      this._selectAllText();
      evt.preventDefault();
      return;
    }
    // Specific cases
    switch (keyCode) {
      case 32: //SPACE
        key = " "; //ie11 key for space is "Spacebar"
        break;
      case 191: //SLASH
        if (evt) {
          evt.preventDefault();
        }
        break;
      case 8: // BACKSPACE
        if (this._text && this._text.length > 0) {
          //delete the highlighted text
          if (this._isTextHighlightOn) {
            this.text =
              this._text.slice(0, this._startHighlightIndex) +
              this._text.slice(this._endHighlightIndex);
            this._isTextHighlightOn = false;
            this._cursorOffset = this.text.length - this._startHighlightIndex;
            this._blinkIsEven = false;
            if (evt) {
              evt.preventDefault();
            }
            return;
          }
          //delete single character
          if (this._cursorOffset === 0) {
            this.text = this._text.substr(0, this._text.length - 1);
          } else {
            var deletePosition = this._text.length - this._cursorOffset;
            if (deletePosition > 0) {
              this.text =
                this._text.slice(0, deletePosition - 1) +
                this._text.slice(deletePosition);
            }
          }
        }
        if (evt) {
          evt.preventDefault();
        }
        return;
      case 46: // DELETE
        if (this._isTextHighlightOn) {
          this.text =
            this._text.slice(0, this._startHighlightIndex) +
            this._text.slice(this._endHighlightIndex);
          var decrementor = this._endHighlightIndex - this._startHighlightIndex;
          while (decrementor > 0 && this._cursorOffset > 0) {
            this._cursorOffset--;
          }
          this._isTextHighlightOn = false;
          this._cursorOffset = this.text.length - this._startHighlightIndex;
          if (evt) {
            evt.preventDefault();
          }
          return;
        }
        if (this._text && this._text.length > 0 && this._cursorOffset > 0) {
          var deletePosition = this._text.length - this._cursorOffset;
          this.text =
            this._text.slice(0, deletePosition) +
            this._text.slice(deletePosition + 1);
          this._cursorOffset--;
        }
        if (evt) {
          evt.preventDefault();
        }
        return;
      case 13: // RETURN
        this._host.focusedControl = null;
        this._isTextHighlightOn = false;
        return;
      case 35: // END
        this._cursorOffset = 0;
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._markAsDirty();
        return;
      case 36: // HOME
        this._cursorOffset = this._text.length;
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._markAsDirty();
        return;
      case 37: // LEFT
        this._cursorOffset++;
        if (this._cursorOffset > this._text.length) {
          this._cursorOffset = this._text.length;
        }
        if (evt && evt.shiftKey) {
          // update the cursor
          this._blinkIsEven = false;
          // shift + ctrl/cmd + <-
          if (evt.ctrlKey || evt.metaKey) {
            if (!this._isTextHighlightOn) {
              if (this._text.length === this._cursorOffset) {
                return;
              } else {
                this._endHighlightIndex =
                  this._text.length - this._cursorOffset + 1;
              }
            }
            this._startHighlightIndex = 0;
            this._cursorIndex = this._text.length - this._endHighlightIndex;
            this._cursorOffset = this._text.length;
            this._isTextHighlightOn = true;
            this._markAsDirty();
            return;
          }
          //store the starting point
          if (!this._isTextHighlightOn) {
            this._isTextHighlightOn = true;
            this._cursorIndex =
              this._cursorOffset >= this._text.length
                ? this._text.length
                : this._cursorOffset - 1;
          }
          //if text is already highlighted
          else if (this._cursorIndex === -1) {
            this._cursorIndex = this._text.length - this._endHighlightIndex;
            this._cursorOffset =
              this._startHighlightIndex === 0
                ? this._text.length
                : this._text.length - this._startHighlightIndex + 1;
          }
          //set the highlight indexes
          if (this._cursorIndex < this._cursorOffset) {
            this._endHighlightIndex = this._text.length - this._cursorIndex;
            this._startHighlightIndex = this._text.length - this._cursorOffset;
          } else if (this._cursorIndex > this._cursorOffset) {
            this._endHighlightIndex = this._text.length - this._cursorOffset;
            this._startHighlightIndex = this._text.length - this._cursorIndex;
          } else {
            this._isTextHighlightOn = false;
          }
          this._markAsDirty();
          return;
        }
        if (this._isTextHighlightOn) {
          this._cursorOffset = this._text.length - this._startHighlightIndex;
          this._isTextHighlightOn = false;
        }
        if (evt && (evt.ctrlKey || evt.metaKey)) {
          this._cursorOffset = this.text.length;
          evt.preventDefault();
        }
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._cursorIndex = -1;
        this._markAsDirty();
        return;
      case 39: // RIGHT
        this._cursorOffset--;
        if (this._cursorOffset < 0) {
          this._cursorOffset = 0;
        }
        if (evt && evt.shiftKey) {
          //update the cursor
          this._blinkIsEven = false;
          //shift + ctrl/cmd + ->
          if (evt.ctrlKey || evt.metaKey) {
            if (!this._isTextHighlightOn) {
              if (this._cursorOffset === 0) {
                return;
              } else {
                this._startHighlightIndex =
                  this._text.length - this._cursorOffset - 1;
              }
            }
            this._endHighlightIndex = this._text.length;
            this._isTextHighlightOn = true;
            this._cursorIndex = this._text.length - this._startHighlightIndex;
            this._cursorOffset = 0;
            this._markAsDirty();
            return;
          }
          if (!this._isTextHighlightOn) {
            this._isTextHighlightOn = true;
            this._cursorIndex =
              this._cursorOffset <= 0 ? 0 : this._cursorOffset + 1;
          }
          //if text is already highlighted
          else if (this._cursorIndex === -1) {
            this._cursorIndex = this._text.length - this._startHighlightIndex;
            this._cursorOffset =
              this._text.length === this._endHighlightIndex
                ? 0
                : this._text.length - this._endHighlightIndex - 1;
          }
          //set the highlight indexes
          if (this._cursorIndex < this._cursorOffset) {
            this._endHighlightIndex = this._text.length - this._cursorIndex;
            this._startHighlightIndex = this._text.length - this._cursorOffset;
          } else if (this._cursorIndex > this._cursorOffset) {
            this._endHighlightIndex = this._text.length - this._cursorOffset;
            this._startHighlightIndex = this._text.length - this._cursorIndex;
          } else {
            this._isTextHighlightOn = false;
          }
          this._markAsDirty();
          return;
        }
        if (this._isTextHighlightOn) {
          this._cursorOffset = this._text.length - this._endHighlightIndex;
          this._isTextHighlightOn = false;
        }
        //ctr + ->
        if (evt && (evt.ctrlKey || evt.metaKey)) {
          this._cursorOffset = 0;
          evt.preventDefault();
        }
        this._blinkIsEven = false;
        this._isTextHighlightOn = false;
        this._cursorIndex = -1;
        this._markAsDirty();
        return;
      case 222: // Dead
        if (evt) {
          evt.preventDefault();
        }
        this._cursorIndex = -1;
        this.deadKey = true;
        break;
    }
    // Printable characters
    if (
      key &&
      (keyCode === -1 || // Direct access
      keyCode === 32 || // Space
      (keyCode > 47 && keyCode < 64) || // Numbers
      (keyCode > 64 && keyCode < 91) || // Letters
      (keyCode > 159 && keyCode < 193) || // Special characters
      (keyCode > 218 && keyCode < 223) || // Special characters
        (keyCode > 95 && keyCode < 112))
    ) {
      // Numpad
      this._currentKey = key;
      this.onBeforeKeyAddObservable.notifyObservers(this);
      key = this._currentKey;
      if (this._addKey) {
        if (this._isTextHighlightOn) {
          this.text =
            this._text.slice(0, this._startHighlightIndex) +
            key +
            this._text.slice(this._endHighlightIndex);
          this._cursorOffset =
            this.text.length - (this._startHighlightIndex + 1);
          this._isTextHighlightOn = false;
          this._blinkIsEven = false;
          this._markAsDirty();
        } else if (this._cursorOffset === 0) {
          this.text += key;
        } else {
          var insertPosition = this._text.length - this._cursorOffset;
          this.text =
            this._text.slice(0, insertPosition) +
            key +
            this._text.slice(insertPosition);
        }
      }
    }
  };
  /** @hidden */
  InputText.prototype._updateValueFromCursorIndex = function(offset) {
    //update the cursor
    this._blinkIsEven = false;
    if (this._cursorIndex === -1) {
      this._cursorIndex = offset;
    } else {
      if (this._cursorIndex < this._cursorOffset) {
        this._endHighlightIndex = this._text.length - this._cursorIndex;
        this._startHighlightIndex = this._text.length - this._cursorOffset;
      } else if (this._cursorIndex > this._cursorOffset) {
        this._endHighlightIndex = this._text.length - this._cursorOffset;
        this._startHighlightIndex = this._text.length - this._cursorIndex;
      } else {
        this._isTextHighlightOn = false;
        this._markAsDirty();
        return;
      }
    }
    this._isTextHighlightOn = true;
    this._markAsDirty();
  };
  /** @hidden */
  InputText.prototype._processDblClick = function(evt) {
    //pre-find the start and end index of the word under cursor, speeds up the rendering
    this._startHighlightIndex = this._text.length - this._cursorOffset;
    this._endHighlightIndex = this._startHighlightIndex;
    var rWord = /\w+/g,
      moveLeft,
      moveRight;
    do {
      moveRight =
        this._endHighlightIndex < this._text.length &&
        this._text[this._endHighlightIndex].search(rWord) !== -1
          ? ++this._endHighlightIndex
          : 0;
      moveLeft =
        this._startHighlightIndex > 0 &&
        this._text[this._startHighlightIndex - 1].search(rWord) !== -1
          ? --this._startHighlightIndex
          : 0;
    } while (moveLeft || moveRight);
    this._cursorOffset = this.text.length - this._startHighlightIndex;
    this.onTextHighlightObservable.notifyObservers(this);
    this._isTextHighlightOn = true;
    this._clickedCoordinate = null;
    this._blinkIsEven = true;
    this._cursorIndex = -1;
    this._markAsDirty();
  };
  /** @hidden */
  InputText.prototype._selectAllText = function() {
    this._blinkIsEven = true;
    this._isTextHighlightOn = true;
    this._startHighlightIndex = 0;
    this._endHighlightIndex = this._text.length;
    this._cursorOffset = this._text.length;
    this._cursorIndex = -1;
    this._markAsDirty();
  };
  /**
   * Handles the keyboard event
   * @param evt Defines the KeyboardEvent
   */
  InputText.prototype.processKeyboard = function(evt) {
    // process pressed key
    this.processKey(evt.keyCode, evt.key, evt);
    this.onKeyboardEventProcessedObservable.notifyObservers(evt);
  };
  /** @hidden */
  InputText.prototype._onCopyText = function(ev) {
    this._isTextHighlightOn = false;
    //when write permission to clipbaord data is denied
    try {
      ev.clipboardData &&
        ev.clipboardData.setData("text/plain", this._highlightedText);
    } catch (_a) {} //pass
    this._host.clipboardData = this._highlightedText;
  };
  /** @hidden */
  InputText.prototype._onCutText = function(ev) {
    if (!this._highlightedText) {
      return;
    }
    this.text =
      this._text.slice(0, this._startHighlightIndex) +
      this._text.slice(this._endHighlightIndex);
    this._isTextHighlightOn = false;
    this._cursorOffset = this.text.length - this._startHighlightIndex;
    //when write permission to clipbaord data is denied
    try {
      ev.clipboardData &&
        ev.clipboardData.setData("text/plain", this._highlightedText);
    } catch (_a) {} //pass
    this._host.clipboardData = this._highlightedText;
    this._highlightedText = "";
  };
  /** @hidden */
  InputText.prototype._onPasteText = function(ev) {
    var data = "";
    if (
      ev.clipboardData &&
      ev.clipboardData.types.indexOf("text/plain") !== -1
    ) {
      data = ev.clipboardData.getData("text/plain");
    } else {
      //get the cached data; returns blank string by default
      data = this._host.clipboardData;
    }
    var insertPosition = this._text.length - this._cursorOffset;
    this.text =
      this._text.slice(0, insertPosition) +
      data +
      this._text.slice(insertPosition);
  };
  InputText.prototype._draw = function(context) {
    var _this = this;
    context.save();
    this._applyStates(context);
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowColor = this.shadowColor;
      context.shadowBlur = this.shadowBlur;
      context.shadowOffsetX = this.shadowOffsetX;
      context.shadowOffsetY = this.shadowOffsetY;
    }
    // Background
    if (this._isFocused) {
      if (this._focusedBackground) {
        context.fillStyle = this._isEnabled
          ? this._focusedBackground
          : this._disabledColor;
        context.fillRect(
          this._currentMeasure.left,
          this._currentMeasure.top,
          this._currentMeasure.width,
          this._currentMeasure.height
        );
      }
    } else if (this._background) {
      context.fillStyle = this._isEnabled
        ? this._background
        : this._disabledColor;
      context.fillRect(
        this._currentMeasure.left,
        this._currentMeasure.top,
        this._currentMeasure.width,
        this._currentMeasure.height
      );
    }
    if (this.shadowBlur || this.shadowOffsetX || this.shadowOffsetY) {
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
    }
    if (!this._fontOffset) {
      this._fontOffset = Control._GetFontOffset(context.font);
    }
    // Text
    var clipTextLeft =
      this._currentMeasure.left +
      this._margin.getValueInPixel(this._host, this._tempParentMeasure.width);
    if (this.color) {
      context.fillStyle = this.color;
    }
    var text = this._beforeRenderText(this._text);
    if (!this._isFocused && !this._text && this._placeholderText) {
      text = this._placeholderText;
      if (this._placeholderColor) {
        context.fillStyle = this._placeholderColor;
      }
    }
    this._textWidth = context.measureText(text).width;
    var marginWidth =
      this._margin.getValueInPixel(this._host, this._tempParentMeasure.width) *
      2;
    if (this._autoStretchWidth) {
      this.width =
        Math.min(
          this._maxWidth.getValueInPixel(
            this._host,
            this._tempParentMeasure.width
          ),
          this._textWidth + marginWidth
        ) + "px";
    }
    var rootY =
      this._fontOffset.ascent +
      (this._currentMeasure.height - this._fontOffset.height) / 2;
    var availableWidth =
      this._width.getValueInPixel(this._host, this._tempParentMeasure.width) -
      marginWidth;
    context.save();
    context.beginPath();
    context.rect(
      clipTextLeft,
      this._currentMeasure.top +
        (this._currentMeasure.height - this._fontOffset.height) / 2,
      availableWidth + 2,
      this._currentMeasure.height
    );
    context.clip();
    if (this._isFocused && this._textWidth > availableWidth) {
      var textLeft = clipTextLeft - this._textWidth + availableWidth;
      if (!this._scrollLeft) {
        this._scrollLeft = textLeft;
      }
    } else {
      this._scrollLeft = clipTextLeft;
    }
    context.fillText(text, this._scrollLeft, this._currentMeasure.top + rootY);
    // Cursor
    if (this._isFocused) {
      // Need to move cursor
      if (this._clickedCoordinate) {
        var rightPosition = this._scrollLeft + this._textWidth;
        var absoluteCursorPosition = rightPosition - this._clickedCoordinate;
        var currentSize = 0;
        this._cursorOffset = 0;
        var previousDist = 0;
        do {
          if (this._cursorOffset) {
            previousDist = Math.abs(absoluteCursorPosition - currentSize);
          }
          this._cursorOffset++;
          currentSize = context.measureText(
            text.substr(text.length - this._cursorOffset, this._cursorOffset)
          ).width;
        } while (
          currentSize < absoluteCursorPosition &&
          text.length >= this._cursorOffset
        );
        // Find closest move
        if (Math.abs(absoluteCursorPosition - currentSize) > previousDist) {
          this._cursorOffset--;
        }
        this._blinkIsEven = false;
        this._clickedCoordinate = null;
      }
      // Render cursor
      if (!this._blinkIsEven) {
        var cursorOffsetText = this.text.substr(
          this._text.length - this._cursorOffset
        );
        var cursorOffsetWidth = context.measureText(cursorOffsetText).width;
        var cursorLeft = this._scrollLeft + this._textWidth - cursorOffsetWidth;
        if (cursorLeft < clipTextLeft) {
          this._scrollLeft += clipTextLeft - cursorLeft;
          cursorLeft = clipTextLeft;
          this._markAsDirty();
        } else if (cursorLeft > clipTextLeft + availableWidth) {
          this._scrollLeft += clipTextLeft + availableWidth - cursorLeft;
          cursorLeft = clipTextLeft + availableWidth;
          this._markAsDirty();
        }
        if (!this._isTextHighlightOn) {
          context.fillRect(
            cursorLeft,
            this._currentMeasure.top +
              (this._currentMeasure.height - this._fontOffset.height) / 2,
            2,
            this._fontOffset.height
          );
        }
      }
      clearTimeout(this._blinkTimeout);
      this._blinkTimeout = setTimeout(function() {
        _this._blinkIsEven = !_this._blinkIsEven;
        _this._markAsDirty();
      }, 500);
      //show the highlighted text
      if (this._isTextHighlightOn) {
        clearTimeout(this._blinkTimeout);
        var highlightCursorOffsetWidth = context.measureText(
          this.text.substring(this._startHighlightIndex)
        ).width;
        var highlightCursorLeft =
          this._scrollLeft + this._textWidth - highlightCursorOffsetWidth;
        this._highlightedText = this.text.substring(
          this._startHighlightIndex,
          this._endHighlightIndex
        );
        var width = context.measureText(
          this.text.substring(
            this._startHighlightIndex,
            this._endHighlightIndex
          )
        ).width;
        if (highlightCursorLeft < clipTextLeft) {
          width = width - (clipTextLeft - highlightCursorLeft);
          if (!width) {
            // when using left arrow on text.length > availableWidth;
            // assigns the width of the first letter after clipTextLeft
            width = context.measureText(
              this.text.charAt(this.text.length - this._cursorOffset)
            ).width;
          }
          highlightCursorLeft = clipTextLeft;
        }
        //for transparancy
        context.globalAlpha = this._highligherOpacity;
        context.fillStyle = this._textHighlightColor;
        context.fillRect(
          highlightCursorLeft,
          this._currentMeasure.top +
            (this._currentMeasure.height - this._fontOffset.height) / 2,
          width,
          this._fontOffset.height
        );
        context.globalAlpha = 1.0;
      }
    }
    context.restore();
    // Border
    if (this._thickness) {
      if (this._isFocused) {
        if (this.focusedColor) {
          context.strokeStyle = this.focusedColor;
        }
      } else {
        if (this.color) {
          context.strokeStyle = this.color;
        }
      }
      context.lineWidth = this._thickness;
      context.strokeRect(
        this._currentMeasure.left + this._thickness / 2,
        this._currentMeasure.top + this._thickness / 2,
        this._currentMeasure.width - this._thickness,
        this._currentMeasure.height - this._thickness
      );
    }
    context.restore();
  };
  InputText.prototype._onPointerDown = function(
    target,
    coordinates,
    pointerId,
    buttonIndex
  ) {
    if (
      !_super.prototype._onPointerDown.call(
        this,
        target,
        coordinates,
        pointerId,
        buttonIndex
      )
    ) {
      return false;
    }
    this._clickedCoordinate = coordinates.x;
    this._isTextHighlightOn = false;
    this._highlightedText = "";
    this._cursorIndex = -1;
    this._isPointerDown = true;
    this._host._capturingControl[pointerId] = this;
    if (this._host.focusedControl === this) {
      // Move cursor
      clearTimeout(this._blinkTimeout);
      this._markAsDirty();
      return true;
    }
    if (!this._isEnabled) {
      return false;
    }
    this._host.focusedControl = this;
    return true;
  };
  InputText.prototype._onPointerMove = function(
    target,
    coordinates,
    pointerId
  ) {
    if (this._host.focusedControl === this && this._isPointerDown) {
      this._clickedCoordinate = coordinates.x;
      this._markAsDirty();
      this._updateValueFromCursorIndex(this._cursorOffset);
    }
    _super.prototype._onPointerMove.call(this, target, coordinates, pointerId);
  };
  InputText.prototype._onPointerUp = function(
    target,
    coordinates,
    pointerId,
    buttonIndex,
    notifyClick
  ) {
    this._isPointerDown = false;
    delete this._host._capturingControl[pointerId];
    _super.prototype._onPointerUp.call(
      this,
      target,
      coordinates,
      pointerId,
      buttonIndex,
      notifyClick
    );
  };
  InputText.prototype._beforeRenderText = function(text) {
    return text;
  };
  InputText.prototype.dispose = function() {
    _super.prototype.dispose.call(this);
    this.onBlurObservable.clear();
    this.onFocusObservable.clear();
    this.onTextChangedObservable.clear();
    this.onTextCopyObservable.clear();
    this.onTextCutObservable.clear();
    this.onTextPasteObservable.clear();
    this.onTextHighlightObservable.clear();
    this.onKeyboardEventProcessedObservable.clear();
  };
  return InputText;
})(Control);
export { InputText };
//# sourceMappingURL=inputText.js.map
