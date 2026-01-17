/* ============================================
   DATE & TEXT FORMATTERS
   ============================================ */

// Format month input to Turkish date
export function formatMonthDate(value) {
    if (!value) return '';
    const [year, month] = value.split('-');
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return `${months[parseInt(month) - 1]} ${year}`;
}

// Format birth date (DD.MM.YYYY)
export function formatBirthDate(value) {
    if (!value) return '';
    const [year, month, day] = value.split('-');
    return `${day}.${month}.${year}`;
}
