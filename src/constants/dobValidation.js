export const isAtLeast18 = (dobStr) => {
    const dob = new Date(dobStr);
    const today = new Date();
    const ageDiff = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    return (
        ageDiff > 18 ||
        (ageDiff === 18 && m >= 0 && today.getDate() >= dob.getDate())
    );
};
