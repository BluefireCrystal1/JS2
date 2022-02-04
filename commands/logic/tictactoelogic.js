// win criteria 
//  a1 b1 c1 
//  a2 b2 c2 
//  a3 b3 c3 
// here see these are pattern like u can win in diagonal and column
//Values -> 0 and 1

let a1 = b1 = c1 = a2 = b2 = c2 = a3 = b3 = c3 = 2

function winnerCheck(a1, a2, a3, b1, b2, b3, c1, c2, c3) {
    //Row Check
    if (a1 == b1 == c1) {
        return a1
    }
    if (a2 == b2 == c2) {
        return a2
    }
    if (a3 == b3 == c3) {
        return a3
    }
    //Column Check
    if (a1 == a2 == a3) {
        return a1
    }
    if (b1 == b2 == b3) {
        return b1
    }
    if (c1 == c2 == c3) {
        return c1
    }
    //Diagonal Check
    if (a1 == b2 == c3) {
        return a1
    }
    if (c1 == b2 == a3) {
        return b1
    }
}//We will check for draw later first work on changing values of a1 b2 b3....? 