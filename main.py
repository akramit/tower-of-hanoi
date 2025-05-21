
def tower_of_hanoi(n, source='A', target='C', auxiliary='B'):
    if n == 1 :
        print(f"Move {source} to {target}")
        return 1
    x = tower_of_hanoi(n-1, source=source, target=auxiliary, auxiliary=target)
    print(f"Move {source} to {target}")
    y = tower_of_hanoi(n-1, source=auxiliary, target=target, auxiliary=source)
    return x+ y + 1


if __name__ == "__main__":
    n = input("How many disks? ")
    try:
        n = int(n)
        if n <= 0:
            raise ValueError("Number of disks must be a positive integer.")
    except ValueError as e:
        print(f"Invalid input: {e}")
    else:
        moves = tower_of_hanoi(n)
        print(f"Total moves: {moves}")
    