LIBRARY ieee;
USE ieee.STD_LOGIC_1164.ALL;

ENTITY tlab1_tb IS
END tlab1_tb;

ARCHITECTURE teste OF tlab1_tb IS

	COMPONENT tlab1 PORT (
		A : IN STD_LOGIC_VECTOR(3 DOWNTO 0);
		D : OUT STD_LOGIC_VECTOR(3 DOWNTO 0)
		);
	END COMPONENT;

	SIGNAL A : STD_LOGIC_VECTOR(3 DOWNTO 0);
	SIGNAL D : STD_LOGIC_VECTOR(3 DOWNTO 0);

BEGIN

	U0 : tlab1 PORT MAP(A => A, D => D);
	PROCESS
	BEGIN
		A <= "0101";
		D(0) <= (NOT(A(1)) AND A(2) AND NOT(A(3))) OR (NOT(A(3)) AND A(0) AND NOT(A(1)))
		OR (A(0) AND A(1) AND A(2)) OR (NOT(A(0)) AND NOT(A(1)) AND NOT(A(2)) AND A(3)) OR
		(NOT(A(0)) AND A(1) AND NOT(A(2)) AND NOT(A(3)));

		WAIT FOR 10 ns;

		A <= "0111";
		D(0) <= (NOT(A(1)) AND A(2) AND NOT(A(3))) OR (NOT(A(3)) AND A(0) AND NOT(A(1)))
		OR (A(0) AND A(1) AND A(2)) OR (NOT(A(0)) AND NOT(A(1)) AND NOT(A(2)) AND A(3)) OR
		(NOT(A(0)) AND A(1) AND NOT(A(2)) AND NOT(A(3)));

		WAIT;

	END PROCESS;

END teste;