import React from 'react';

import personIcon from 'assets/icons/person.svg';
import lockIcon from 'assets/icons/lock.svg';
import lockQuestionIcon from 'assets/icons/lockQuestion.svg';
import mailIcon from 'assets/icons/mail.svg';
import searchIcon from 'assets/icons/search.svg';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import bankAccountIcon from 'assets/icons/bankAccount.svg';
import creditCardIcon from 'assets/icons/creditCard.svg';
import arrowRightIcon from 'assets/icons/arrow-right.svg';
import arrowRightWhiteIcon from 'assets/icons/arrow-right-white.svg';
import calendarIcon from 'assets/icons/calendar.svg';

export default function FastIcon({ iconName, width = 17, height = 17, ...rest }) {
  const renderIcon = () => {
    switch (iconName) {
      case 'person':
        return personIcon;
      case 'lock':
        return lockIcon;
      case 'lockQuestion':
        return lockQuestionIcon;
      case 'mail':
        return mailIcon;
      case 'search':
        return searchIcon;
      case 'arrow-down':
        return arrowDownIcon;
      case 'bankAccount':
        return bankAccountIcon;
      case 'creditCard':
        return creditCardIcon;
      case 'arrow-right':
        return arrowRightIcon;
      case 'arrow-right-white':
        return arrowRightWhiteIcon;
      case 'calendar':
        return calendarIcon;
      default:
        return '';
    }
  };

  return <img {...rest} style={{ width, height }} src={renderIcon()} alt={iconName} />;
}
